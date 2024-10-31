class AdvancedCache {
    constructor(options = {}) {
        this.cache = new Map();
        this.config = {
            maxEntries: options.maxEntries || 100,
            maxAge: options.maxAge || 24 * 60 * 60 * 1000,
            autoPrune: options.autoPrune !== undefined ? options.autoPrune : true,
            pruneInterval: options.pruneInterval || 60 * 60 * 1000,
        };

        if (this.config.autoPrune) {
            this.startAutoPrune();
        }
    }

    validateTimestamp(timestamp) {
        // Handle invalid or missing timestamps
        if (!timestamp || isNaN(new Date(timestamp).getTime())) {
            return Date.now();
        }
        return timestamp;
    }

    genKey(path, params = {}) {
        if (!path) return '';
        
        const stringifyParam = (param) => {
            if (param === null || param === undefined) return '';
            try {
                if (typeof param === 'object') {
                    return JSON.stringify(Object.entries(param)
                        .sort()
                        .map(([k, v]) => `${k}:${stringifyParam(v)}`)
                    );
                }
                return String(param);
            } catch (error) {
                console.warn('Error stringifying param:', error);
                return '';
            }
        };

        try {
            const sortedParams = Object.entries(params || {})
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([key, value]) => `${key}=${stringifyParam(value)}`)
                .join('&');

            return `${path}?${sortedParams}`;
        } catch (error) {
            console.error('Error generating cache key:', error);
            return path;
        }
    }

    set(path, content, options = {}) {
        try {
            const entry = {
                content: content || '',
                meta: {
                    createdAt: this.validateTimestamp(Date.now()),
                    etag: options.etag || '', 
                    lastModified: this.validateTimestamp(options.lastModified),
                    tags: Array.isArray(options.tags) ? options.tags : [],
                    size: content ? new Blob([content]).size : 0
                }
            };

            const key = this.genKey(path, options.params);
            if (key) {
                this.cache.set(key, entry);
                this.maintainCacheSize();
            }

            return entry;
        } catch (error) {
            console.error('Error setting cache entry:', error);
            return null;
        }
    }

    get(path, params = {}) {
        try {
            const key = this.genKey(path, params);
            if (!key) return null;

            const entry = this.cache.get(key);
            if (!entry) return null;

            // Ensure createdAt exists and is valid
            if (!entry.meta || !entry.meta.createdAt || isNaN(new Date(entry.meta.createdAt).getTime())) {
                this.cache.delete(key);
                return null;
            }

            if (this.isExpired(entry)) {
                this.cache.delete(key);
                return null;
            }

            return entry;
        } catch (error) {
            console.error('Error getting cache entry:', error);
            return null;
        }
    }

    isExpired(entry) {
        try {
            const createdAt = this.validateTimestamp(entry?.meta?.createdAt);
            return (Date.now() - createdAt) > this.config.maxAge;
        } catch (error) {
            console.error('Error checking expiration:', error);
            return true; // Fail safe: treat as expired if there's an error
        }
    }

    maintainCacheSize() {
        try {
            if (this.cache.size <= this.config.maxEntries) return;

            const sortedEntries = Array.from(this.cache.entries())
                .filter(([, entry]) => entry?.meta?.createdAt)
                .sort((a, b) => {
                    const timeA = this.validateTimestamp(a[1].meta.createdAt);
                    const timeB = this.validateTimestamp(b[1].meta.createdAt);
                    return timeA - timeB;
                });

            while (this.cache.size > this.config.maxEntries && sortedEntries.length > 0) {
                const [oldestKey] = sortedEntries.shift();
                this.cache.delete(oldestKey);
            }
        } catch (error) {
            console.error('Error maintaining cache size:', error);
        }
    }

    startAutoPrune() {
        try {
            this.stopAutoPrune(); // Clear any existing timer
            this.pruneTimer = setInterval(() => {
                try {
                    for (const [key, entry] of this.cache.entries()) {
                        if (this.isExpired(entry)) {
                            this.cache.delete(key);
                        }
                    }
                } catch (error) {
                    console.error('Error during auto-prune:', error);
                }
            }, this.config.pruneInterval);
        } catch (error) {
            console.error('Error starting auto-prune:', error);
        }
    }

    getStats() {
        try {
            const entries = Array.from(this.cache.values());
            return {
                totalEntries: this.cache.size,
                totalSize: entries.reduce((sum, entry) => {
                    return sum + (entry?.meta?.size || 0);
                }, 0),
                oldestEntry: entries.reduce((oldest, entry) => {
                    if (!entry?.meta?.createdAt) return oldest;
                    return (!oldest || entry.meta.createdAt < oldest.meta.createdAt) 
                        ? entry 
                        : oldest;
                }, null)
            };
        } catch (error) {
            console.error('Error getting cache stats:', error);
            return {
                totalEntries: 0,
                totalSize: 0,
                oldestEntry: null
            };
        }
    }

    clearByTag(tag) {
        try {
            for (const [key, entry] of this.cache.entries()) {
                if (entry?.meta?.tags?.includes(tag)) {
                    this.cache.delete(key);
                }
            }
        } catch (error) {
            console.error('Error clearing by tag:', error);
        }
    }

    stopAutoPrune() {
        if (this.pruneTimer) {
            clearInterval(this.pruneTimer);
            this.pruneTimer = null;
        }
    }

    clear(path, params = {}) {
        try {
            const key = this.genKey(path, params);
            if (key) {
                this.cache.delete(key);
            }
        } catch (error) {
            console.error('Error clearing cache entry:', error);
        }
    }

    clearAll() {
        try {
            this.cache.clear();
        } catch (error) {
            console.error('Error clearing all cache entries:', error);
        }
    }
}

class AdvancedFetcher {
    constructor(cache) {
        this.cache = cache;
    }

    async fetch(path, options = {}) {
        if (!path) {
            throw new Error('Path is required');
        }

        try {
            const cached = this.cache.get(path, options.params);
            const headers = new Headers(options.headers || {});
            
            if (cached?.meta?.etag) {
                headers.append('If-None-Match', cached.meta.etag);
            }
            
            if (cached?.meta?.lastModified) {
                headers.append('If-Modified-Since', cached.meta.lastModified);
            }

            const res = await fetch(path, { 
                ...options, 
                headers 
            });

            if (res.status === 304 && cached) {
                return { 
                    content: cached.content, 
                    fromCache: true, 
                    status: 304 
                };
            }

            if (res.ok) {
                const content = await res.text();
                
                this.cache.set(path, content, {
                    etag: res.headers.get('ETag'),
                    lastModified: res.headers.get('Last-Modified'),
                    tags: options.tags,
                    params: options.params
                });

                return { 
                    content, 
                    fromCache: false, 
                    status: res.status 
                };
            }

            throw new Error(`Failed to fetch page: ${res.status}`);
        } catch (error) {
            console.error('Fetch error:', error);
            const cached = this.cache.get(path, options.params);
            
            if (cached) {
                console.warn('Network error, serving from cache');
                return { 
                    content: cached.content, 
                    fromCache: true, 
                    status: 200 
                };
            }
            throw error;
        }
    }
}

export const pageCache = new AdvancedCache({
    maxEntries: 200,
    maxAge: 48 * 60 * 60 * 1000,
    autoPrune: true
});

export const pageFetcher = new AdvancedFetcher(pageCache);
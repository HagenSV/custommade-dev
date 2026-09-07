export interface StoredItem {
    id: string;
    lastModified: number
}

type StoredItemKeys = keyof StoredItem;

/**
 * A utility class for managing the localstorage of objects of a particular type
 */
export default class LocalStorage<T extends StoredItem> {
    
    constructor(
        private path: string,
        private defaultValue: Omit<T, StoredItemKeys>
    ) { }

    /**
     * Gets the ids of all values stored in the localstorage
     * @returns a list of the ids
     */
    getIds(): string[] {
        const data = localStorage.getItem(this.getResourceKeysLocation())

        if (!data) return [];

        const json = JSON.parse(data);

        return json as string[];
    }

    /**
     * Loads a JSON object from storage
     * @param id the id to load
     * @returns the parsed object, if present, or null if not
     */
    load(id: string): T | null {
        const data = localStorage.getItem(this.getResourceLocation(id))

        if (!data) return null;

        const json = JSON.parse(data) 

        return this.validate(json)
    }

    create(): T {
        const newId = crypto.randomUUID();

        this.addKey(newId);

        //Typescript complains if the return type isnt explicitly cast
        //It should return the correct type though.
        return {
            id: newId,
            lastModified: Date.now(),
            ...this.defaultValue,
        } as T;
    }

    /**
     * Saves a JSON object to localstorage and updates the last modified time to the current time
     * @param data the object to store
     */
    update(data: T){
        data.lastModified = Date.now();
        this.save(data);
    }

    /**
     * Saves a JSON object to localstorage without updating the last modified tiem
     * @param data the object to store
     */
    save(data: T){
        localStorage.setItem(
            this.getResourceLocation(data.id),
            JSON.stringify(data)
        );
    }

    delete(id: string){
        localStorage.removeItem(
            this.getResourceLocation(id)
        )
    }

    /**
     * @returns the localstorage path for object keys
     */
    private getResourceKeysLocation(){
        return `${this.path}/keys`
    }

    /**
     * @param id the id of a stored object
     * @returns the localstorage path of the object
     */
    private getResourceLocation(id: string){
        return `${this.path}/${id}`;
    }

    /**
     * Validates parsed object from localstorage, filling in default values where necessary
     * @param value the parsed object to validate
     * @returns a validated object
     */
    private validate(value: T): T {
        const keys = Object.keys({} as Omit<T, StoredItemKeys>) as (keyof Omit<T, StoredItemKeys>)[];
        for (const key of keys){
            if (!value[key]){
                value[key] = this.defaultValue[key];
            }
        }

        return value;
    }

    private addKey(key: string){
        const keys = this.getIds();

        keys.push(key);

        localStorage.setItem(
            this.getResourceKeysLocation(),
            JSON.stringify(keys)
          );
    }

    private removeKey(key: string){
        const keys = this.getIds();

        const updatedKeys = keys.filter(id => id !== key);

        localStorage.setItem(
            this.getResourceKeysLocation(),
            JSON.stringify(keys)
        )
    }
}
interface Translations {
    [key: string]: {
        [locale: string]: string;
    };
}

interface Placeholders {
    [key: string]: string;
}

/**
 * Manages translations of the user interface.
 *
 * @see extend
 * @see setPlaceholders
 * @see get
 */
class Lexicon {
    /**
     * Default translations.
     *
     * @private
     */
    private static _translations: Translations;

    /**
     * Used language.
     *
     * @private
     */
    private static _locale: string;

    /**
     * Default language.
     */
    static get locale(): string {
        this._locale ??= 'en';

        return this._locale;
    }

    /**
     * Default language.
     *
     * @param locale Language abbreviation for example: en, ru, etc.
     */
    static set locale(locale: string) {
        this._locale = locale;
    }

    /**
     * Extends the default translations with new phrases.
     *
     * @param translations New translations.
     */
    static extend(translations: Translations): void {
        this._translations = {...this._translations, ...translations};
    }

    /**
     * Sets placeholders to a string.
     *
     * @param string Source string.
     * @param placeholders An object containing placeholders.
     */
    static setPlaceholders(string: string, placeholders: Placeholders): string {
        const keys: string[] = Object.keys(placeholders);

        for (const key of keys) {
            string = string.replace(`{${key}}`, placeholders[key]);
        }

        return string;
    }

    /**
     * Returns a localized string.
     *
     * @param key Key to access translations.
     */
    static get(key: string): string;

    /**
     * Returns a localized string.
     *
     * @param key Key to access translations.
     * @param locale Required language.
     */
    static get(key: string, locale: string): string;

    /**
     * Returns a localized string.
     *
     * @param key Key to access translations.
     * @param placeholders An object containing placeholders.
     */
    static get(key: string, placeholders: Placeholders): string;

    /**
     * Returns a localized string.
     *
     * @param key Key to access translations.
     * @param mixed Required language or object containing placeholders.
     */
    static get(key: string, mixed?: string | Placeholders): string {
        if (!this._translations) throw new Error('Translations is not defined.');

        const locale: string = (typeof mixed === 'string') ? mixed : this.locale;
        const placeholders: Placeholders = (typeof mixed === 'object') ? mixed : {};

        if (key in this._translations && locale in this._translations[key]) {
            key = this.setPlaceholders(this._translations[key][locale], placeholders);
        }

        return key;
    }
}

export default Lexicon;
export {
    Translations,
    Placeholders,
}

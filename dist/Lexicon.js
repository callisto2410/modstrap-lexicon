"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexicon = void 0;
/**
 * Manages translations of the user interface.
 *
 * @see extend
 * @see format
 * @see get
 *
 * Lexicon:
 * [Github]{@link https://github.com/ordinateio/lexicon}
 */
class Lexicon {
    /**
     * Default translations.
     */
    static get translations() {
        return this._translations;
    }
    /**
     * Default language.
     */
    static get locale() {
        var _a;
        (_a = this._locale) !== null && _a !== void 0 ? _a : (this._locale = "en");
        return this._locale;
    }
    /**
     * Default language.
     *
     * @param locale Language abbreviation for example: en, ru, etc.
     */
    static set locale(locale) {
        this._locale = locale;
    }
    /**
     * Extends the default translations with new phrases.
     *
     * @param translations New translations.
     */
    static extend(translations) {
        for (const [key, value] of Object.entries(translations)) {
            if (!value)
                continue;
            this.translations[key] = {
                ...this.translations[key],
                ...translations[key]
            };
        }
    }
    /**
     * Returns a localized string.
     *
     * @param phrase The key phrase to access translations.
     * @param placeholders Objects containing placeholders.
     */
    static get(phrase, ...placeholders) {
        if (!this.translations)
            throw new Error("'LexiconTranslations' is not defined.");
        if (phrase in this.translations && this.locale in this.translations[phrase]) {
            phrase = this.format(this.translations[phrase][this.locale], ...placeholders);
        }
        return phrase;
    }
    /**
     * Sets the specified placeholders to the original string.
     *
     * @param string Original string.
     * @param placeholders Objects containing placeholders.
     */
    static format(string, ...placeholders) {
        for (const item of [...placeholders]) {
            for (const [key, value] of Object.entries(item)) {
                string = string.replace("{" + key + "}", value);
            }
        }
        return string;
    }
}
exports.Lexicon = Lexicon;
/**
 * Default translations.
 *
 * @private
 */
Lexicon._translations = {};

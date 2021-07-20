import {Lexicon} from '../src';

const en = 'However, we should not forget that the constant quantitative growth and ...';
const ru = 'Не следует, однако забывать, что постоянный количественный рост и сфера ...';
const de = 'Wir sollten jedoch nicht vergessen, dass das konstante quantitative Wachstum ...';


describe('Translations ...', () => {
    const lexicon = new Lexicon({
        locale: 'de'
    });

    test('The language is set to "de".', () => {
        expect(lexicon.locale).toBe('de');
    });

    lexicon.extend({
        test: {
            en: en,
        }
    });

    test('Adding the language "en".', () => {
        expect('en' in lexicon.translations['test']).toBe(true);
    });

    lexicon.extend({
        test: {
            ru: ru,
        }
    });

    test('Adding the language "ru".', () => {
        expect('ru' in lexicon.translations['test']).toBe(true);
    });

    lexicon.extend({
        test: {
            de: de,
        }
    });

    test('Adding the language "de".', () => {
        expect('de' in lexicon.translations['test']).toBe(true);
    });
});

describe('Matching translations ...', () => {
    const lexicon = new Lexicon();
    lexicon.extend({
        test: {
            en: en,
            ru: ru,
            de: de,
        }
    });

    test('Language "en".', () => {
        lexicon.locale = 'en';

        expect(lexicon.get('test')).toContain(en);
    });

    test('Language "ru".', () => {
        lexicon.locale = 'ru';

        expect(lexicon.get('test')).toContain(ru);
    });

    test('Language "de".', () => {
        lexicon.locale = 'de';

        expect(lexicon.get('test')).toContain(de);
    });
});

describe('Formatting ...', () => {
    const lexicon = new Lexicon();
    lexicon.extend({
        test: {
            en: en,
            ru: ru,
            de: de,
        }
    });

    test('Language "en".', () => {
        const value = lexicon.format(
            'However, {p1} {p2} ...',
            {
                'p1': 'we should not forget that the constant',
                'p2': 'quantitative growth and',
            },
        );

        expect(value).toBe(en);
    });

    test('Language "ru".', () => {
        const value = lexicon.format(
            'Не следует, {p1} {p2} ...',
            {
                'p1': 'однако забывать, что постоянный',
                'p2': 'количественный рост и сфера',
            },
        );

        expect(value).toBe(ru);
    });

    test('Language "de".', () => {
        const value = lexicon.format(
            'Wir sollten {p1} {p2} ...',
            {
                'p1': 'jedoch nicht vergessen, dass das',
                'p2': 'konstante quantitative Wachstum',
            },
        );

        expect(value).toBe(de);
    });
});

describe('Rest ...', () => {
    const lexicon = new Lexicon();
    lexicon.extend({
        test: {
            en: en,
            ru: ru,
            de: de,
        }
    });

    test('Missing key.', () => {
        expect(lexicon.get('missing_key')).toBe('missing_key');
    });
});
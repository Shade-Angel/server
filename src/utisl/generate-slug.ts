export interface SlugOptions {
	separator?: string

	lowercase?: boolean

	strict?: boolean
}

const CYRILLIC_MAP: Record<string, string> = {
	а: 'a',
	б: 'b',
	в: 'v',
	г: 'g',
	д: 'd',
	е: 'e',
	ё: 'e',
	ж: 'zh',
	з: 'z',
	и: 'i',
	й: 'y',
	к: 'k',
	л: 'l',
	м: 'm',
	н: 'n',
	о: 'o',
	п: 'p',
	р: 'r',
	с: 's',
	т: 't',
	у: 'u',
	ф: 'f',
	х: 'kh',
	ц: 'ts',
	ч: 'ch',
	ш: 'sh',
	щ: 'shch',
	ъ: '',
	ы: 'y',
	ь: '',
	э: 'e',
	ю: 'yu',
	я: 'ya',
	А: 'A',
	Б: 'B',
	В: 'V',
	Г: 'G',
	Д: 'D',
	Е: 'E',
	Ё: 'E',
	Ж: 'Zh',
	З: 'Z',
	И: 'I',
	Й: 'Y',
	К: 'K',
	Л: 'L',
	М: 'M',
	Н: 'N',
	О: 'O',
	П: 'P',
	Р: 'R',
	С: 'S',
	Т: 'T',
	У: 'U',
	Ф: 'F',
	Х: 'Kh',
	Ц: 'Ts',
	Ч: 'Ch',
	Ш: 'Sh',
	Щ: 'Shch',
	Ъ: '',
	Ы: 'Y',
	Ь: '',
	Э: 'E',
	Ю: 'Yu',
	Я: 'Ya'
}

export function generateSlug(text: string, options: SlugOptions = {}): string {
	if (typeof text !== 'string' || text.trim().length === 0) return ''

	const { separator = '-', lowercase = true, strict = true } = options
	const safeSeparator = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

	let slug = ''

	for (const char of text) {
		if (CYRILLIC_MAP[char]) {
			slug += CYRILLIC_MAP[char]
		} else if (/[a-zA-Z0-9]/.test(char)) {
			slug += char
		} else {
			slug += separator
		}
	}

	if (lowercase) {
		slug = slug.toLowerCase()
	}

	const multiSepRegex = new RegExp(`${safeSeparator}+`, 'g')
	const trimSepRegex = new RegExp(`^${safeSeparator}|${safeSeparator}$`, 'g')
	slug = slug.replace(multiSepRegex, separator).replace(trimSepRegex, '')

	if (strict) {
		const allowedRegex = lowercase
			? new RegExp(`[^a-z0-9${safeSeparator}]`, 'g')
			: new RegExp(`[^a-zA-Z0-9${safeSeparator}]`, 'g')
		slug = slug.replace(allowedRegex, '')
	}

	return slug
}

export default generateSlug

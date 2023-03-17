export interface IBook {
	etag: string
	id: string
	kind: string
	accessInfo: {
		accessViewStatus: string
		country: string
		embeddable: boolean
		epub: { isAvailable: boolean }
		pdf: { isAvailable: boolean; acsTokenLink: string }
		publicDomain: boolean
		quoteSharingAllowed: boolean
		textToSpeechPermission: string
		viewability: string
		webReaderLink: string
	}
	saleInfo: {
		buyLink: string
		country: string
		isEbook: boolean
		listPrice: { amount: number; currencyCode: string }
		offers: {
			finskyOfferType: number
			listPrice: { amountInMicros: 1056000000; currencyCode: 'RUB' }
			retailPrice: { amountInMicros: number; currencyCode: string }
		}[]
		retailPrice: { amount: number; currencyCode: string }
		saleability: string
	}
	searchInfo: {
		textSnippet: string
	}
	selfLink: string
	volumeInfo: {
		allowAnonLogging: boolean
		canonicalVolumeLink: string
		contentVersion: string
		description: string
		imageLinks: {
			smallThumbnail: string
			thumbnail: string
		}
		industryIdentifiers: {
			identifier: string
			type: string
		}[]
		infoLink: string
		language: string
		maturityRating: string
		pageCount: number
		panelizationSummary: {
			containsEpubBubbles: boolean
			containsImageBubbles: boolean
		}
		previewLink: string
		printType: string
		publishedDate: string
		publisher: string
		readingModes: {
			text: boolean
			image: boolean
		}
		title: string
	}
}

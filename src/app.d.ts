// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	type Dictionnary = Record<string, string>;
	interface LocalFile {
		default: Dictionnary;
	}
	type Dictionnaries = Record<string, Dictionnary>;
}

export {};

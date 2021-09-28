import Outline from './outline'
import './style.scss'

export const registerOutlinePanel = () => {
	const { registerPanel, togglePanel } = window.FL.Builder

	registerPanel( 'outline', {
		label: 'Outline',
		render: Outline, // legacy
		root: Outline // asst compat branch changes to root
	} )

	FLBuilder.addHook( 'didInitUI', () => {
		const actions = document.querySelector( '.fl-builder-bar-actions' )
		const saving = actions.querySelector( '.fl-builder--saving-indicator' )

		const btn = document.createElement( 'button' )
		btn.classList.add( 'fl-builder-button', 'fl-builder-button-silent' )
		btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.38672 5.33984C2.1582 5.33984 2.77344 4.72461 2.77344 3.95312C2.77344 3.19141 2.1582 2.56641 1.38672 2.56641C0.625 2.56641 0 3.19141 0 3.95312C0 4.72461 0.625 5.33984 1.38672 5.33984ZM5.97656 4.89062H14.0565C14.5838 4.89062 15.0038 4.48047 15.0038 3.95312C15.0038 3.42578 14.5936 3.01562 14.0565 3.01562H5.97656C5.45898 3.01562 5.03906 3.42578 5.03906 3.95312C5.03906 4.48047 5.44922 4.89062 5.97656 4.89062ZM3.88672 11.3457C4.64844 11.3457 5.27344 10.7305 5.27344 9.95898C5.27344 9.19727 4.64844 8.57227 3.88672 8.57227C3.11523 8.57227 2.49023 9.19727 2.49023 9.95898C2.49023 10.7305 3.11523 11.3457 3.88672 11.3457ZM8.47656 10.8965H16.5794C17.1068 10.8965 17.5169 10.4863 17.5169 9.95898C17.5169 9.43164 17.1068 9.02148 16.5794 9.02148H8.47656C7.94922 9.02148 7.53906 9.43164 7.53906 9.95898C7.53906 10.4863 7.94922 10.8965 8.47656 10.8965ZM6.37695 17.3516C7.14844 17.3516 7.76367 16.7363 7.76367 15.9648C7.76367 15.2031 7.14844 14.5781 6.37695 14.5781C5.61523 14.5781 4.99023 15.2031 4.99023 15.9648C4.99023 16.7363 5.61523 17.3516 6.37695 17.3516ZM10.9668 16.9023H19.0251C19.5524 16.9023 19.9626 16.4922 19.9626 15.9648C19.9626 15.4375 19.5524 15.0273 19.0251 15.0273H10.9668C10.4395 15.0273 10.0293 15.4375 10.0293 15.9648C10.0293 16.4922 10.4395 16.9023 10.9668 16.9023Z" fill="currentColor"/></svg>'
		btn.onclick = () => togglePanel( 'outline' )
		btn.title = 'Outline'

		actions.insertBefore( btn, saving )
	} )
}

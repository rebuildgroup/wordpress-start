import * as actions from './actions'

/**
 * Shorthand function for handling server responses with newNodes and/or updatedNodes
 */
const mergeNewAndUpdatedNodes = ( response, store ) => {
	const { newNodes = {}, updatedNodes = {} } = FLBuilder._jsonParse( response )

	// Insert all affected nodes
	if ( 0 < Object.keys( newNodes ).length ) {
		store.dispatch( actions.insertNodes( newNodes ) )
	}

	// Update positions on sibling nodes
	Object.entries( updatedNodes ).map( ( [ id, node ] ) => {
		store.dispatch( actions.updateNode( id, node ) )
	} )
}

export const before = {}

export const after = {
	UNDO() {
		window.FLBuilderHistoryManager.renderState( 'prev' )
	},
	REDO() {
		window.FLBuilderHistoryManager.renderState( 'next' )
	},

	/**
	* Generic Nodes
	*/
	UPDATE_NODE_SETTINGS( { id: node_id, settings, callback } ) {
		FLBuilder.ajax( {
			action: 'save_settings',
			node_id,
			settings
		}, callback )
	},
	REORDER_NODE( { id: node_id, position }, store ) {

		// Move it on the canvas if it hasn't already
		const { moveNode } = FL.Builder.__canvas.getActions()
		moveNode( node_id, position )

		FLBuilder.ajax( {
			action: 'reorder_node',
			node_id,
			position
		}, response => {
			mergeNewAndUpdatedNodes( response, store )
			FLBuilder._reorderNodeComplete( response )
		} )
	},
	REPARENT_NODE( { id, parent, position }, store ) {

		// Move it on the canvas if it hasn't already
		const { moveNode } = FL.Builder.__canvas.getActions()
		moveNode( id, position, parent )

		FLBuilder.ajax( {
			action: 'move_node',
			new_parent: parent,
			node_id: id,
			position
		}, response => {
			mergeNewAndUpdatedNodes( response, store )
			FLBuilder._moveNodeComplete( response )
		} )
	},
	RENDER_NODE( { id, callback } ) {
		FLBuilder.ajax( {
			action: 'render_node',
			node_id: id
		}, response => {
			const data = FLBuilder._jsonParse( response )
			FLBuilder._renderLayout( data, callback )
		} )
	},
	DELETE_NODE( { id } ) {
		FLBuilder.ajax( {
			action: 'delete_node',
			node_id: id
		} )
	},

	/**
	* Modules
	*/
	ADD_MODULE( { moduleType, parent, position, config }, store ) {
		FLBuilder.ajax( {
			action: 'render_new_module',
			parent_id: parent,
			type: moduleType,
			position,
			node_preview: config.nodePreview,
			widget: config.widget,
			alias: config.alias
		}, response => {
			mergeNewAndUpdatedNodes( response, store )
			FLBuilder._addModuleComplete( response )
		} )
	},
	COPY_MODULE( { id, settings, callback }, store ) {
		FLBuilder.ajax( {
			action: 'copy_module',
			node_id: id,
			settings
		}, response => {
			mergeNewAndUpdatedNodes( response, store )
			callback( response )
		} )
	},

	/**
	* Columns
	*/
	ADD_COLUMNS( { id, insert, colType, nested, module }, store ) {
		FLBuilder.ajax( {
			action: 'render_new_columns',
			node_id: id,
			insert,
			type: colType,
			nested,
			module
		}, response => {

			// newNodes here actually includes siblings with position updates
			// see server-side handler for the reason
			mergeNewAndUpdatedNodes( response, store )
			FLBuilder._addColsComplete( response )
		} )
	},
	RESIZE_COLUMN( { id, width, siblingId, siblingWidth, shouldPersist }, store ) {
		if ( shouldPersist ) {

			// Clear the resizing ids
			store.dispatch( actions.resizingComplete() )

			FLBuilder.ajax( {
				action: 'resize_cols',
				col_id: id,
				col_width: width,
				sibling_id: siblingId,
				sibling_width: siblingWidth
			}, response => mergeNewAndUpdatedNodes( response, store ) )
		}
	},
	RESET_COLUMN_WIDTHS( { groupIds: group_id } ) {
		FLBuilder.ajax( {
			action: 'reset_col_widths',
			group_id
		}, () => FLBuilder.triggerHook( 'didResetColumnWidthsComplete' ) )
	},
	DELETE_COLUMN( { id, width } ) {
		FLBuilder.ajax( {
			action: 'delete_col',
			node_id: id,
			new_width: width
		} )
	},
	REORDER_COLUMN( { id, position } ) {

		// Move it on the canvas if it hasn't already
		const { moveNode } = FL.Builder.__canvas.getActions()
		moveNode( id, position )

		FLBuilder.ajax( {
			action: 'reorder_col',
			node_id: id,
			position
		}, () => FLBuilder.triggerHook( 'didMoveColumn' ) )
	},
	REPARENT_COLUMN( { id, parent, position, resize } ) {

		// Move it on the canvas if it hasn't already
		const { moveNode } = FL.Builder.__canvas.getActions()
		moveNode( id, position, parent )

		FLBuilder.ajax( {
			action: 'move_col',
			node_id: id,
			new_parent: parent,
			position,
			resize
		}, () => FLBuilder.triggerHook( 'didMoveColumn' ) )
	},
	COPY_COLUMN( { id, settings, settingsId, callback }, store ) {
		FLBuilder.ajax( {
			action: 'copy_col',
			node_id: id,
			settings,
			settings_id: settingsId
		}, response => {
			mergeNewAndUpdatedNodes( response, store )
			callback( response )
		} )
	},

	/**
	* Column Groups
	*/
	ADD_COLUMN_GROUP( { id, cols, position, module }, store ) {
		FLBuilder.ajax( {
			action: 'render_new_column_group',
			node_id: id,
			cols,
			position,
			module,
		}, response => {
			mergeNewAndUpdatedNodes( response, store )
			FLBuilder._addColGroupComplete( response )
		} )
	},

	/**
	* Rows
	*/
	ADD_ROW( { cols, position, module }, store ) {
		FLBuilder.ajax( {
			action: 'render_new_row',
			cols,
			position,
			module,
		}, response => {
			mergeNewAndUpdatedNodes( response, store )
			FLBuilder._addRowComplete( response )
		} )
	},
	COPY_ROW( { id, settings, settingsId, callback }, store ) {
		FLBuilder.ajax( {
			action: 'copy_row',
			node_id: id,
			settings,
			settings_id: settingsId
		}, response => {
			mergeNewAndUpdatedNodes( response, store )
			callback( response )
		} )
	},
	RESIZE_ROW_CONTENT( { id: node, width, shouldPersist }, store ) {
		if ( shouldPersist ) {
			FLBuilder.ajax( {
				action: 'resize_row_content',
				node,
				width
			} )

			// Clear the resizing ids
			store.dispatch( actions.resizingComplete() )
		}
	},
	RESET_ROW_WIDTH( { id } ) {
		FLBuilder.ajax( {
			action: 'resize_row_content',
			node: id,
			width: ''
		} )
	},

	/**
	* Templates
	*/
	APPLY_TEMPLATE( { id: template_id, append, templateType }, store ) {

		const callback = 'core' === templateType ? FLBuilder._applyTemplateComplete : FLBuilder._applyUserTemplateComplete

		FLBuilder.ajax( {
			action: 'core' === templateType ? 'apply_template' : 'apply_user_template',
			template_id,
			append
		}, response => {
			const data = FLBuilder._jsonParse( response )
			store.dispatch( actions.setLayout( data.newNodes, [] ) )
			callback( response )
		} )
	},
	ADD_NODE_TEMPLATE( { nodeType, templateId, templateType, parent, position, callback }, store ) {

		let action = ''
		switch ( nodeType ) {
		case 'row':
			action = 'render_new_row_template'
			break
		case 'column':
			action = 'render_new_col_template'
			break
		default:
			action = 'render_new_module'
		}

		FLBuilder.ajax( {
			action,
			template_id: templateId,
			template_type: templateType,
			parent_id: parent,
			position
		}, response => {
			mergeNewAndUpdatedNodes( response, store )
			callback( response )
		} )
	},
	SAVE_NODE_TEMPLATE( { id, settings }, store ) {
		FLBuilder.ajax( {
			action: 'save_node_template',
			node_id: id,
			settings
		}, response => {
			store.dispatch( actions.fetchLayout() )

			FLBuilder._saveNodeTemplateComplete( response )
			FLBuilder._hideNodeLoading( id )
		} )
	},
	DELETE_NODE_TEMPLATE( { id, global } ) {
		FLBuilder.ajax( {
			action: 'delete_node_template',
			template_id: id
		}, () => {
			if ( global ) {
				FLBuilder._updateLayout()
			}
		} )
	},
	SAVE_USER_TEMPLATE_SETTINGS( { settings } ) {
		FLBuilder.ajax( {
			action: 'save_user_template',
			settings
		}, FLBuilder._saveUserTemplateSettingsComplete )
	},
	DELETE_USER_TEMPLATE( { id } ) {
		FLBuilder.ajax( {
			action: 'delete_user_template',
			template_id: id
		} )
	},
	RENDER_LAYOUT() {
		FLBuilder.ajax( {
			action: 'render_layout'
		}, FLBuilder._renderLayout )
	},
	FETCH_LAYOUT( action, store ) {
		FLBuilder.ajax( {
			action: 'get_layout'
		}, response => {
			const { nodes, attachments } = FLBuilder._jsonParse( response )
			store.dispatch( actions.setLayout( nodes, attachments ) )
		} )
	},
	SAVE_LAYOUT( { shouldPublish, shouldExit, callback } ) {
		FLBuilder.ajax( {
			action: 'save_layout',
			publish: shouldPublish,
			exit: shouldExit ? 1 : 0,
		}, callback )
	},
	SAVE_DRAFT() {
		FLBuilder.ajax( {
			action: 'save_draft'
		}, FLBuilder._exit )
	},
	DISCARD_DRAFT() {
		FLBuilder.ajax( {
			action: 'clear_draft_layout'
		}, () => {
			FLBuilder.triggerHook( 'didDiscardChanges' )
			FLBuilder._exit()
		} )
	},
	SAVE_LAYOUT_SETTINGS( { settings } ) {
		FLBuilder.ajax( {
			action: 'save_layout_settings',
			settings
		}, () => FLBuilder._saveLayoutSettingsComplete( settings ) )
	},
	SAVE_GLOBAL_SETTINGS( { settings } ) {
		FLBuilder.ajax( {
			action: 'save_global_settings',
			settings
		}, FLBuilder._saveGlobalSettingsComplete )
	},

	/**
	* History States
	*/
	SAVE_HISTORY_STATE( { label, moduleType } ) {
		FLBuilder.ajax( {
			action: 'save_history_state',
			label,
			module_type: moduleType,
		}, function( response ) {
			const data = FLBuilder._jsonParse( response )
			FLBuilderHistoryManager.states = data.states
			FLBuilderHistoryManager.position = parseInt( data.position )
			FLBuilderHistoryManager.setupMainMenuData()
		} )
	},
	CLEAR_HISTORY_STATES( { postId, shouldExit } ) {
		FLBuilder.ajax( {
			action: 'clear_history_states',
			post_id: postId,
		}, () => {
			if ( ! shouldExit ) {
				FLBuilderHistoryManager.saveCurrentState( 'draft_created' )
			}
		} )
	},
	RENDER_HISTORY_STATE( { position, callback }, store ) {
		FLBuilder.ajax( {
			action: 'render_history_state',
			position,
		}, response => {
			const { newNodes, config } = FLBuilder._jsonParse( response )
			store.dispatch( actions.setLayout( newNodes, config.attachments ) )
			callback( response )
		} )
	},

	/**
	* Settings Panels
	*/
	DISPLAY_SETTINGS( { id }, store ) {
		const { nodes } = store.getState().layout.present

		if ( 'global' === id ) {
			FLBuilder._globalSettingsClicked()
			return
		} else if ( 'layout' === id ) {
			FLBuilder._layoutSettingsClicked()
			return
		}

		if ( undefined !== nodes[ id ] ) {
			const { type, settings, parent, global, template_id } = nodes[ id ]

			switch ( type ) {
			case 'column-group':
				break
			case 'row':
				FLBuilder._showRowSettings( id, global )
				break
			case 'column':
				const isNodeTemplate = 'column' !== FLBuilderConfig.userTemplateType && undefined !== template_id
				FLBuilder._showColSettings( id, global, isNodeTemplate )
				break
			default:
				FLBuilder._showModuleSettings( {
					nodeId: id,
					parentId: parent,
					type: settings.type,
					global
				} )
			}
		}
	},
}

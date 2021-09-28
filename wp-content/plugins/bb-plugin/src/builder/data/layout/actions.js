
export const undo = () => ( { type: 'UNDO' } )

export const redo = () => ( { type: 'REDO' } )

/**
* Generic Nodes
*/
export const insertNode = ( id, parent = null, nodeType, position = 0, settings = {}, global = false, ...rest ) => ( {
	type: 'INSERT_NODE',
	id,
	parent,
	position,
	nodeType,
	settings,
	global,
	...rest
} )
export const insertFreeformNode = ( id, node = {} ) => ( {
	type: 'INSERT_FREEFORM_NODE',
	id,
	node
} )
export const insertNodes = ( nodes = {} ) => ( {
	type: 'INSERT_NODES',
	nodes
} )
export const reorderNode = ( id, position ) => ( {
	type: 'REORDER_NODE',
	id,
	position
} )
export const moveNode = ( id, parent, position ) => ( {
	type: 'REPARENT_NODE',
	id,
	parent,
	position
} )
export const renderNode = ( id, callback = () => {} ) => ( {
	type: 'RENDER_NODE',
	id,
	callback
} )
export const updateNode = ( id, node = {} ) => ( {
	type: 'UPDATE_NODE',
	id,
	node
} )
export const updateNodeSettings = ( id, settings = {}, callback = () => {} ) => ( {
	type: 'UPDATE_NODE_SETTINGS',
	id,
	settings,
	callback
} )
export const updateNodeSetting = ( id, key, value ) => ( {
	type: 'UPDATE_NODE_SETTING',
	id,
	key,
	value
} )
export const deleteNode = id => ( {
	type: 'DELETE_NODE',
	id
} )

/**
* Modules
*/
export const addModule = ( moduleType, parent, position, config = {} ) => ( {
	type: 'ADD_MODULE',
	moduleType,
	parent,
	position,
	config
} )

export const copyModule = ( id, settings = {}, callback = () => {} ) => ( {
	type: 'COPY_MODULE',
	id,
	settings,
	callback
} )

/**
* Columns
*/
export const addColumns = ( id, insert, colType = '1-col', nested, module ) => ( {
	type: 'ADD_COLUMNS',
	id,
	insert,
	colType,
	nested,
	module
} )
export const reorderColumn = ( id, position ) => ( {
	type: 'REORDER_COLUMN',
	id,
	position
} )
export const moveColumn = ( id, parent, position, resize = [] ) => ( {
	type: 'REPARENT_COLUMN',
	id,
	parent,
	position,
	resize
} )
export const copyColumn = ( id, settings, settingsId, callback = () => {} ) => ( {
	type: 'COPY_COLUMN',
	id,
	settings,
	settingsId,
	callback
} )
export const resizeColumn = ( id, width, siblingId, siblingWidth, shouldPersist = true ) => ( {
	type: 'RESIZE_COLUMN',
	id,
	width: parseInt( width ),
	siblingId,
	siblingWidth: parseInt( siblingWidth ),
	shouldPersist
} )
export const deleteColumn = ( id, width ) => ( {
	type: 'DELETE_COLUMN',
	id,
	width
} )
export const resetColWidths = ( groupIds = [] ) => ( {
	type: 'RESET_COLUMN_WIDTHS',
	groupIds
} )


/**
* Column Groups
*/
export const addColumnGroup = ( id, cols, position, module ) => ( {
	type: 'ADD_COLUMN_GROUP',
	id,
	cols,
	position,
	module
} )

/**
* Rows
*/
export const addRow = ( cols = 1, position, module ) => ( {
	type: 'ADD_ROW',
	cols,
	position,
	module
} )
export const copyRow = ( id, settings = {}, settingsId, callback = () => {} ) => ( {
	type: 'COPY_ROW',
	id,
	settings,
	settingsId,
	callback
} )
export const resizeRowContent = ( id, width, shouldPersist = true ) => ( {
	type: 'RESIZE_ROW_CONTENT',
	id,
	width,
	shouldPersist
} )
export const resetRowWidth = id => ( {
	type: 'RESET_ROW_WIDTH',
	id
} )

/**
* Templates
*/
export const applyTemplate = ( id, append = '0', templateType = 'core' ) => ( {
	type: 'APPLY_TEMPLATE',
	id,
	append,
	templateType
} )
export const addNodeTemplate = ( nodeType, templateId, templateType, parent, position, callback = () => {} ) => ( {
	type: 'ADD_NODE_TEMPLATE',
	nodeType,
	templateId,
	templateType,
	parent,
	position,
	callback
} )
export const saveNodeTemplate = ( id, settings = {} ) => ( {
	type: 'SAVE_NODE_TEMPLATE',
	id,
	settings
} )
export const deleteNodeTemplate = ( id, global = false ) => ( {
	type: 'DELETE_NODE_TEMPLATE',
	id,
	global
} )
export const saveUserTemplateSettings = ( settings = {} ) => ( {
	type: 'SAVE_USER_TEMPLATE_SETTINGS',
	settings
} )
export const deleteUserTemplate = ( id ) => ( {
	type: 'DELETE_USER_TEMPLATE',
	id
} )
export const addColumnTemplate = () => ( {
	type: 'ADD_COLUMN_TEMPLATE',
} )
export const addRowTemplate = () => ( {
	type: 'ADD_ROW_TEMPLATE',
} )

/**
* Full Layout
*/
export const fetchLayout = () => ( {
	type: 'FETCH_LAYOUT'
} )
export const setLayout = ( nodes = {}, attachments ) => ( {
	type: 'SET_LAYOUT',
	nodes,
	attachments
} )
export const renderLayout = () => ( {
	type: 'RENDER_LAYOUT'
} )
export const saveLayoutSettings = ( settings = {} ) => ( {
	type: 'SAVE_LAYOUT_SETTINGS',
	settings
} )
export const saveGlobalSettings = ( settings = {} ) => ( {
	type: 'SAVE_GLOBAL_SETTINGS',
	settings
} )

/**
 * Publish/Save Actions
 */
export const saveLayout = ( shouldPublish = false, shouldExit = false, callback = () => {} ) => ( {
	type: 'SAVE_LAYOUT',
	shouldPublish,
	shouldExit,
	callback
} )
export const saveDraft = () => ( {
	type: 'SAVE_DRAFT'
} )
export const discardDraft = () => ( {
	type: 'DISCARD_DRAFT'
} )


/**
* History States
*/
export const saveHistoryState = ( label, moduleType ) => ( {
	type: 'SAVE_HISTORY_STATE',
	label,
	moduleType
} )
export const clearHistoryStates = ( postId, shouldExit = false ) => ( {
	type: 'CLEAR_HISTORY_STATES',
	postId,
	shouldExit
} )
export const renderHistoryState = ( position, callback = () => {} ) => ( {
	type: 'RENDER_HISTORY_STATE',
	position,
	callback
} )

/**
* Settings Panels
*/
export const displaySettings = ( id ) => ( {
	type: 'DISPLAY_SETTINGS',
	id
} )
export const cancelDisplaySettings = () => ( {
	type: 'CANCEL_DISPLAY_SETTINGS'
} )


/**
 * Misc
 */
export const resizingComplete = () => ( {
	type: 'RESIZING_COMPLETE'
} )

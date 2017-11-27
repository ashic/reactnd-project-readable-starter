import _ from 'lodash'

export const commentsForm = () => {

    const schema = {
        type: "object",
        properties: {
            // id	String	Unique identifier
            // parentId	String	id of the parent post
            // timestamp	Integer	Time created - default data tracks this in Unix time. You can use Date.now() to get this number
            // body	String	Comment body
            // author	String	Comment author
            // voteScore	Integer	Net votes the comment has received (default: 1)
            // deleted	Boolean	Flag if comment has been 'deleted' (inaccessible by the front end), (default: false)
            // parentDeleted	Boolean
            id: { type: "string" },
            parentId: { type: "string" },
            timestamp: { type: "integer" },
            body: { type: "string", title: "Comment" },
            author: { type: "string", title: "Author" }
        }

    }

    const uiSchema = {
        id: { "ui:widget": "hidden" },
        parentId: { "ui:widget": "hidden" },
        timestamp: { "ui:widget": "hidden" },
        body: { "ui:widget": "textarea" }
    };

    return {
        title: "Comment",
        schema,
        uiSchema
    }
}

export const postEditForm = () => {
    const schema = {
        type: "object",
        properties: {
            // id	String	Unique identifier
            // parentId	String	id of the parent post
            // timestamp	Integer	Time created - default data tracks this in Unix time. You can use Date.now() to get this number
            // body	String	Comment body
            // author	String	Comment author
            // voteScore	Integer	Net votes the comment has received (default: 1)
            // deleted	Boolean	Flag if comment has been 'deleted' (inaccessible by the front end), (default: false)
            // parentDeleted	Boolean
            id: { type: "string" },
            title: { type: "string" },
            body: { type: "string", title: "Body" },
        }

    }

    const uiSchema = {
        id: { "ui:widget": "hidden" },
        body: { "ui:widget": "textarea" }
    };

    return {
        title: "Edit Post",
        schema,
        uiSchema
    }

}

export const newPostForm = (categories) => {
    const schema = {
        type: "object",
        properties: {
            // id	String	Unique identifier
            // parentId	String	id of the parent post
            // timestamp	Integer	Time created - default data tracks this in Unix time. You can use Date.now() to get this number
            // body	String	Comment body
            // author	String	Comment author
            // voteScore	Integer	Net votes the comment has received (default: 1)
            // deleted	Boolean	Flag if comment has been 'deleted' (inaccessible by the front end), (default: false)
            // parentDeleted	Boolean
            id: { type: "string" },
            author: { type: "string", title: "Author" },
            title: { type: "string" },
            timestamp: { type: "integer" },
            body: { type: "string", title: "Body" },
            category: {
                type: "string",
                title: "Category",
                enum: _.map(categories, x => x.path),
                enumNames: _.map(categories, x => x.name)
            }
        }

    }

    const uiSchema = {
        id: { "ui:widget": "hidden" },
        timestamp: { "ui:widget": "hidden" },
        body: { "ui:widget": "textarea" }
    };

    return {
        title: "Post",
        schema,
        uiSchema
    }
}
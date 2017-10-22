import React, {Component} from 'react'
import { Panel } from 'react-bootstrap'
import Voter from '../voter'
import * as actions from '../../actions'

class PostView extends Component {

    render() {
        
        if (!this.props.id) return (
            <div />
        )
        const { id, title, author, body, timestamp, voteScore } = this.props

        return (
            <Panel>
                <h2>{title}</h2>
                <h4>{author}</h4>
                <div>{Date(timestamp).toString()}</div>
                <Voter voteScore={voteScore} id={id} onVote={actions.votePost} />
                <hr />
                <p>
                    {body}
                </p>
            </Panel>
        )
    }

}

export default PostView
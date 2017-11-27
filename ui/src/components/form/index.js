import React, { Component } from 'react'
import JsForm from 'react-jsonschema-form'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import * as actions from '../../actions'

class Form extends Component {

    close() {
        this.props.dispatch(actions.closeForm())
    }

    render() {

        return (
            <div>
                {this.props.show && (
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>{this.props.title}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <JsForm schema={this.props.schema}
                                uiSchema={this.props.uiSchema}
                                formData={this.props.data}
                                onSubmit={data => this.props.onSubmit && this.props.onSubmit(data.formData)}
                            >
                                <div>
                                    <Button className='btn-raised' onClick={() => this.close()}>Close</Button>
                                    <Button bsStyle="primary" className='btn-raised' type='submit'>Save changes</Button>
                                </div>
                            </JsForm>
                        </Modal.Body>
                    </Modal.Dialog>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    show: state.form.show,
    title: state.form.title,
    schema: state.form.schema,
    uiSchema: state.form.uiSchema,
    data: state.form.data,
    onSubmit: state.form.onSubmit
})

export default connect(mapStateToProps)(Form)
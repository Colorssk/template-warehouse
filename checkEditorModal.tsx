import * as React from 'react'
import { Modal, Form, Input, Button, } from 'antd'
import { hasPrivilege } from 'sunny-foundation/AccessControl/RBAC/PermissionsManager'
// services
import FormService from '@/library/services/formService'
// styles
import styles from './style.module.scss'

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
}
class EditModal extends FormService {
  public static defaultProps = {
    data: {},
    handleGetData: () => null,
    platform: '', // 平台名称
    type: 'agree', // 同意或者拒绝
  }

  public state = {
    isVisible: false,
    loading: false,
    defaultValue: '2',
    isscore: 1,
  }

  public componentDidMount() {
    // this.bindAction({
    //   api: editOrder,
    //   hasPrivilege: hasPrivilege(authMap.historyEdit),
    //   successCallback: () => {
    //     message.success('修改成功')
    //     this.onRest()
    //   },
    // })
  }

  public getIsAgree = (): any => {
    const {
      props: { type, data, ...restProps },
    } = this
    return {
      ...restProps,
      data,
    }
  }

  public onSubmit = async (form) => {
    const { data, platform } = this.getIsAgree()
    const sendingData = Object.assign({}, data, form, {
      platform,
      id: data.id,
      isscore: this.state.isscore,
    })
    // return this.getSingle({
    //   action: editOrder.toString(),
    //   sendingData,
    // })
  }

  public render() {
    const {
      state: { isVisible, loading },
      props: { data, children },
    } = this
    const { isAgree } = this.getIsAgree()
    return (
      <React.Fragment>
        <a onClick={this.onOpenModal}>{children}</a>
        <Modal
          title={'编辑订单'}
          width={700}
          visible={isVisible}
          confirmLoading={loading}
          destroyOnClose
          className={styles.payRecordcheckEdit}
          onCancel={this.onCloseModal}
          // onOk={this.onValidateForm}
          footer={[
            <Button
              key="1"
              type="primary"
              onClick={() => {
              }}
            >
              立即上分
            </Button>,
          ]}
        >
          <Form
            ref={this.modalFormRef}
            initialValues={{
              name: data.member_name,
              ...data,
              types: 15,
            }}
          >
            <Form.Item label={'用户名'} {...formItemLayout} name="name" colon={false}>
              <Input disabled />
            </Form.Item>
          </Form>
        </Modal>
      </React.Fragment>
    )
  }
}

export default EditModal

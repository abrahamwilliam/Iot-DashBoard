import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Modal,
  Form,
  // DatePicker,
  Select,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import Result from '@/components/Result';

import styles from './BasicList.less';

// 316 連結

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
@Form.create()
class BasicList extends PureComponent {
  state = { visible: false, done: false };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item,
    });
  };

  // handleDone = () => {
  //   setTimeout(() => this.addBtn.blur(), 0);
  //   this.setState({
  //     done: false,
  //     visible: false,
  //   });
  // };

  handleCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';

    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
        visible: false,
      });
      dispatch({
        type: 'list/submit',
        payload: { id, ...fieldsValue },
      });
    });
  };

  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/submit',
      payload: { id },
    });
  };

  render() {
    const {
      list: { list },
      loading,
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, done, current = {} } = this.state;

    const editAndDelete = (key, currentItem) => {
      if (key === 'edit') this.showEditModal(currentItem);
      else if (key === 'delete') {
        Modal.confirm({
          title: 'Delete task',
          content: 'Are you sure you want to delete this task?',
          okText: 'Confirm',
          cancelText: 'Cancel',
          onOk: () => this.deleteItem(currentItem.id),
        });
      }
    };

    // const modalFooter = done
    //   ? { footer: null, onCancel: this.handleDone }
    //   : { okText: 'save', cancelText: 'cancel', onOk: this.handleSubmit, onCancel: this.handleCancel };
    const modalFooter = {
      okText: 'save',
      cancelText: 'cancel',
      onOk: this.handleSubmit,
      onCancel: this.handleCancel,
    };

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">进行中</RadioButton>
          <RadioButton value="waiting">等待中</RadioButton>
        </RadioGroup>
        <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
      </div>
    );

    const paginationProps = {
      // showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: list.length,
    };

    // card content
    const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Owner</span>
          <p>{owner}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>Start date</span>
          <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
        </div>
        <div className={styles.listContentItem}>
          <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
        </div>
      </div>
    );

    const MoreBtn = props => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => editAndDelete(key, props.current)}>
            <Menu.Item key="edit">Edit</Menu.Item>
            <Menu.Item key="delete">Delete</Menu.Item>
          </Menu>
        }
      >
        <a>
          More <Icon type="down" />
        </a>
      </Dropdown>
    );

    const getModalContent = () => {
      // if (done) {
      //   return (
      //     <Result
      //       type="success"
      //       title="Success!"
      //       description="一系列的信息描述，很短同样也可以带标点。"
      //       actions={
      //         <Button type="primary" onClick={this.handleDone}>
      //           Done
      //         </Button>
      //       }
      //       className={styles.formResult}
      //     />
      //   );
      // }
      return (
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col span={12} offset={11}>
              <Avatar size={70} icon="user" />
            </Col>
          </Row>
          <br />
          <FormItem label="Title" {...this.formLayout}>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'You must enter a title' }],
              initialValue: current.title,
            })(<Input placeholder="Please enter a title" />)}
          </FormItem>

          <FormItem label="Start date" {...this.formLayout}>
            {getFieldDecorator('createdAt', {
              rules: [{ required: true, message: 'Please select a day' }],
              initialValue: current.createdAt ? moment(current.createdAt) : null,
            })(
              <Input type="date" placeholder="Please select a day" />
              // <DatePicker
              //   showTime
              //   format="YYYY-MM-DD HH:mm:ss"
              //   style={{ width: '100%' }}
              // />
            )}
          </FormItem>
          <FormItem label="Person in charge" {...this.formLayout}>
            {getFieldDecorator('owner', {
              rules: [{ required: true, message: 'Please select one person' }],
              initialValue: current.owner,
            })(
              <Select placeholder="Please select">
                <SelectOption value="付晓晓">付晓晓</SelectOption>
                <SelectOption value="周毛毛">周毛毛</SelectOption>
                <SelectOption value="Andy Liu">Andy Liu</SelectOption>
                <SelectOption value="Jacky Chan">Jacky Chan</SelectOption>
              </Select>
            )}
          </FormItem>
          <FormItem {...this.formLayout} label="Description">
            {getFieldDecorator('subDescription', {
              rules: [
                { message: 'Please enter at leaset five letters about your product！', min: 5 },
              ],
              initialValue: current.subDescription,
            })(<TextArea rows={4} placeholder="Please enter at leaset five letters..." />)}
          </FormItem>
        </Form>
      );
    };
    return (
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="我的待办" value="8个任务" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周任务平均处理时间" value="32分钟" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周完成任务数" value="24个任务" />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="标准列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8 }}
              icon="plus"
              onClick={this.showModal}
              ref={component => {
                /* eslint-disable */
                this.addBtn = findDOMNode(component);
                /* eslint-enable */
              }}
            >
              add
            </Button>
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={item => (
                <List.Item actions={[<MoreBtn current={item} />]}>
                  <List.Item.Meta
                    avatar={
                      item.logo ? (
                        <Avatar src={item.logo} size="large" />
                      ) : (
                        <Avatar size="large" icon="user" />
                      )
                    }
                    title={<a href="./table-list">{item.title}</a>}
                    description={item.subDescription}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
        <Modal
          title={done ? null : `Task${current.id ? ' edit' : ' create'}`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default BasicList;

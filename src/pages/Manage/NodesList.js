import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Tag, Card, Form, Button, Badge, Divider } from 'antd';
import SimpleTable from '@/components/SimpleTable';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './NodesList.less';

const statusMap = text => {
  switch (text) {
    case 'power':
      return 'success';
    case 'water':
      return 'processing';
    case 'temp':
      return 'warning';
    case 'light':
      return 'error';
    default:
      return 'default';
  }
};

const cap = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const filterMapper = items => items.map(item => ({ text: cap(item), value: item }));

/* eslint react/no-multi-comp:0 */
@connect(({ nodes }) => ({
  nodes,
}))
@Form.create()
class NodesList extends PureComponent {
  state = {
    selectedRows: [],
    pagination: {},
    filters: {},
    sorter: {},
  };

  columns = [
    {
      title: formatMessage({ id: 'manage.id' }),
      dataIndex: 'id',
      sorter: true,
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: formatMessage({ id: 'manage.name' }),
      dataIndex: 'name',
      // render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: formatMessage({ id: 'manage.description' }),
      dataIndex: 'description',
    },
    {
      title: formatMessage({ id: 'manage.type' }),
      dataIndex: 'type',
      filters: undefined,
      render: text => <Badge status={statusMap(text)} text={text} />,
    },
    {
      title: formatMessage({ id: 'manage.tags' }),
      dataIndex: 'tags',
      filters: undefined,
      render: tags => (
        <span>
          {tags.map(tag => (
            <Tag color="blue">{tag}</Tag>
          ))}
        </span>
      ),
    },
    {
      title: formatMessage({ id: 'manage.modify' }),
      render: () => (
        <Fragment>
          <a onClick={() => null}>Edit</a>
          <Divider type="vertical" />
          <a onClick={() => null}>Detail</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'nodes/fetchNodes',
    });
  }

  filterData = (data, filters) =>
    data.filter(item =>
      Object.keys(filters).every(
        key => !filters[key].length || filters[key].indexOf(item[key]) >= 0
      )
    );

  formatData = (data, filters, sorter) => {
    const result = data.filter(item =>
      Object.keys(filters).every(
        key => !filters[key].length || filters[key].indexOf(item[key]) >= 0
      )
    );
    if (sorter.field) {
      result.sort((a, b) => (a[sorter.field] < b[sorter.field] ? -1 : 1));
      if (sorter.reverse) result.reverse();
    }
    return result;
  };

  handleTableChange = (pagination, filters, sorterArg) => {
    this.setState({
      filters,
      pagination,
      sorter: sorterArg
        ? {
            field: sorterArg.field,
            reverse: sorterArg.order === 'ascend',
          }
        : {},
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  previewItem = id => {
    router.push(`/detail/nodeDetail/${id}`);
  };

  render() {
    const { nodes } = this.props;
    const { selectedRows, pagination, filters, sorter } = this.state;
    const list = this.formatData(nodes.list, filters, sorter)
    this.columns[3].filters = this.columns[3].filters || filterMapper(nodes.types)
    this.columns[4].filters = this.columns[4].filters || filterMapper(nodes.tags)

    return (
      <PageHeaderWrapper title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => router.push(`/register/nodes`)}>
                Create
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button onClick={this.handleMenuClick}>Batch Update</Button>
                  <Button onClick={this.handleMenuClick}>Delete</Button>
                </span>
              )}
            </div>
            <SimpleTable
              selectedRows={selectedRows}
              data={{ list, pagination }}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default NodesList;

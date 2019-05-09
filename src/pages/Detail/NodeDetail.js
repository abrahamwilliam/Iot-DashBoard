import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Divider, Row, Col, List, Avatar, Progress } from 'antd';
import { Tag, Switch, Statistic } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import moment from 'moment';
import styles from './NodeDetail.less';

const typeMap = {
  power: { color: '#FFD866', icon: 'thunderbolt' },
  water: { color: '#78DCE8', icon: 'cloud' },
  temp: { color: '#FF6188', icon: 'dashboard' },
  light: { color: '#A9DC76', icon: 'poweroff' },
};

@connect(({ shadows }) => ({
  shadows,
}))
class ShadowCard extends PureComponent {
  componentDidMount() {
    const { dispatch, shadow } = this.props;
    this.interval = setInterval(() => {
      dispatch({
        type: 'shadows/updateOneShadow',
        payload: { id: shadow.id },
      });
    }, Math.random() * 4000 + 8000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { shadow } = this.props;

    const statistic = (
      <Statistic
        precision={1}
        value={shadow.value ? shadow.status ? shadow.value : 'N/A' : 'Fetching'}
        suffix={shadow.status ? shadow.unit : ''}
      />
    );

    const switchs = (
      <Switch
        style={{ marginTop: '0.5em', marginBottom: '0.5em' }}
        disabled={!shadow.status}
        checked={shadow.value === 'on'}
      />
    );

    const progress = shadow.status ? (
      <Progress
        strokeColor={typeMap[shadow.type].color}
        percent={((shadow.value - shadow.min) / (shadow.max - shadow.min)) * 100}
        status="active"
        showInfo={false}
      />
    ) : (
      <Progress showInfo={false} />
    );

    return (
      <Row>
        <Col span={4}>
          {shadow.type ? (
            <Avatar
              style={{
                backgroundColor:
                  shadow.status && typeMap[shadow.type] ? typeMap[shadow.type].color : 'grey',
              }}
              icon={typeMap[shadow.type].icon}
              size={70}
            />
          ) : (
            <Avatar size={64} icon="user" />
          )}
        </Col>
        <Col span={4} style={{ marginTop: '20px' }}>
          <p style={{ color: typeMap[shadow.type].color }}>{shadow.name}</p>
        </Col>
        <Col span={5} style={{ marginTop: '10px' }}>
          <span>Update:</span>
          <p>{moment(shadow.updateTime).format('YYYY-MM-DD HH:mm')}</p>
        </Col>
        <Col span={11}>
          {shadow.type === 'light' ? switchs : statistic}
          {progress}
        </Col>
      </Row>
    );
  }
}

@connect(({ nodes }) => ({
  nodes,
}))
class Info extends PureComponent {
  render() {
    const { node } = this.props;
    console.log(this.props);
    return (
      <div>
        <Row>
          <Col span={6}>
            <span style={{ fontWeight: 'bold' }}>ID: </span>
            <span>{node.id}</span>
          </Col>
          <Col span={6}>
            <span style={{ fontWeight: 'bold' }}>Name: </span>
            <span>{node.name}</span>
          </Col>
          <Col span={6}>
            <span style={{ fontWeight: 'bold' }}>Type: </span>
            <span>{node.type}</span>
          </Col>
          <Col span={6}>
            <span style={{ fontWeight: 'bold' }}>Tags: </span>
            <span>
              {node.tags.map(tag => (
                <Tag color="blue">{tag}</Tag>
              ))}
            </span>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <span style={{ fontWeight: 'bold' }}>Description:</span>
            <p>{node.description}</p>
          </Col>
        </Row>
      </div>
    );
  }
}

@connect(({ nodes, shadows }) => ({
  nodes,
  shadows,
}))
class NodeDetail extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;
    dispatch({
      type: 'nodes/fetchOneNode',
      payload: { id: params.id || 'pw-001' },
    });
    dispatch({
      type: 'shadows/fetchOneShadow',
      payload: { id: params.id || 'pw-001' },
    });
  }

  render() {
    const { nodes, shadows, loading } = this.props;
    console.log('nodes', nodes, 'shadows', shadows);

    return (
      <PageHeaderWrapper title="Detail Page">
        <Card bordered={false}>
          <List
            size="large"
            rowKey="id"
            loading={loading}
            dataSource={shadows.list}
            renderItem={shadow => <ShadowCard shadow={shadow} />}
          />

          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>Details</div>
          <List
            size="large"
            rowKey="id"
            loading={loading}
            dataSource={nodes.list}
            renderItem={node => <Info node={node} />}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default NodeDetail;

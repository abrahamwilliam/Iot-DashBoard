/* eslint-disable react/no-multi-comp */
/* eslint-disable no-nested-ternary */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, List, Avatar, Statistic, Progress, Icon, Switch } from 'antd';
import moment from 'moment';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './CardList.less';


const typeMap = {
  'power': { color: '#FFD866', icon: 'thunderbolt' },
  'water': { color: '#78DCE8', icon: 'cloud' },
  'temp': { color: '#FF6188', icon: 'dashboard' },
  'light': { color: '#A9DC76', icon: 'poweroff' },
}

@connect(({ shadows, loading }) => ({
  shadows,
  loading: loading.models.list,
}))

class ShadowCard extends PureComponent {
  componentDidMount() {
    const { dispatch, shadow } = this.props;
    this.interval = setInterval(() => {
      dispatch({
        type: 'shadows/updateOneShadow',
        payload: { id: shadow.id }
      });
    }, Math.random() * 4000 + 8000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { shadow } = this.props
    console.log(shadow)

    const statistic =  (
      <Statistic
        precision={1}
        value={shadow.value ? shadow.status ? shadow.value : 'N/A' : 'Fetching'}
        suffix={shadow.status ? shadow.unit : ''}
      />
    )

    const switchs = (
      <Switch style={{marginTop:'0.5em', marginBottom:'0.5em'}} disabled={!shadow.status} checked={shadow.value === 'on'} />
    )

    const progress = shadow.status ? (
      <Progress
        strokeColor={typeMap[shadow.type].color}
        percent={(shadow.value - shadow.min)/ (shadow.max - shadow.min)*100}
        status='active'
        showInfo={false}
      />
    ) : <Progress showInfo={false} />

    return (
      <Card hoverable className={styles.card} actions={[<Icon type="poweroff" />, <Icon type="sync" />]}>
        <Card.Meta
          style={{ height: 100 }}
          avatar={
            <div>
              <Avatar
                style={{ backgroundColor: shadow.status && typeMap[shadow.type] ? typeMap[shadow.type].color : 'grey' }}
                icon={typeMap[shadow.type].icon}
                size="large"
              />
            </div>
            }
          title={
            <a style={{ color: shadow.status && typeMap[shadow.type] ? typeMap[shadow.type].color : 'grey' }}>{shadow.name}</a>
          }
          description={
            <div>
              {shadow.type==='light' ? switchs:statistic}
              {progress}
              <p className={styles.cardP}>update: {moment(shadow.updateTime).format('MM-DD hh:mm:ss')}</p>
            </div>
          }
        />
      </Card>
    )
  }
}

@connect(({ shadows, loading }) => ({
  shadows,
  loading: loading.models.list,
}))
class ShadowsList extends PureComponent {
  content = (
    <div className={styles.pageHeaderContent}>
      <p>
        段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
        提供跨越设计与开发的体验解决方案。
      </p>
    </div>
  );

  extraContent = (
    <div className={styles.extraImg}>
      <img
        alt="list"
        src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
      />
    </div>
  );

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'shadows/fetchShadows',
    });
  };

  render() {
    const {
      shadows: { list },
      loading,
    } = this.props;

    return (
      <PageHeaderWrapper title="卡片列表" content={this.content} extraContent={this.extraContent}>
        <div className={styles.ShadowsList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, xl:3, lg: 3, md: 3, sm: 2, xs: 1 }}
            dataSource={list}
            renderItem={shadow => (
              <List.Item key={shadow.id}>
                <ShadowCard shadow={shadow} />
              </List.Item>
            )}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default ShadowsList;

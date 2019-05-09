import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Icon, Menu, Dropdown, Avatar } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
import styles from './DemoDashboard.less';
import workstyles from './Workplace.less';
import { AsyncLoadBizCharts } from '@/components/Charts/AsyncLoadBizCharts';
import PageLoading from '@/components/PageLoading';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import Mlcomponent from './mlcomponent'


const TemperatureCard = React.lazy(() => import('./TemperatureCard'));
const BottomAnalysis = React.lazy(() => import('./BottomAnalysis'));
const PowerIntroduce = React.lazy(() => import('./PowerIntroduce'));

// const roomData = [{name: 'Room 1', costRate: 0.2}];

@connect(({ history, user, loading }) => ({
  history,
  currentUser: user.currentUser,
  loading: loading.effects['history/fetch_history'],
}))

class DemoDashboard extends Component {
  state = {
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'history/fetch_history',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'history/clear',
    });
    cancelAnimationFrame(this.reqRef);
  }

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = rangePickerValue => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });

    dispatch({
      type: 'history/fetch_history',
    });
  };

  selectDate = type => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    dispatch({
      type: 'history/fetch_history',
    });
  };

  isActive = type => {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };
  
  render() {
    const { rangePickerValue, currentTabKey } = this.state;
    const { history, loading } = this.props;
    const {
      demoTemperature,
      timechartTemp,
      roomData,
      costData,
      // loading,
    } = history;
    const {
      currentUser,
      currentUserLoading,
    } = this.props;
    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const dropdownGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );

    const activeKey = currentTabKey || (roomData[0] && roomData[0].name);

    const pageHeaderContent =
      currentUser && Object.keys(currentUser).length ? (
        <div className={workstyles.pageHeaderContent}>
          <div className={workstyles.avatar}>
            <Avatar size="large" src={currentUser.avatar} />
          </div>
          <div className={workstyles.content}>
            <div className={workstyles.contentTitle}>
              早安，
              {currentUser.name}
              ，祝你开心每一天！
            </div>
            <div>
              {currentUser.title} |{currentUser.group}
            </div>
          </div>
        </div>
      ) : null;

      const extraContent = (
        <div className={workstyles.extraContent}>
          <div className={workstyles.statItem}>
            <p>项目数</p>
            <p>56</p>
          </div>
          <div className={workstyles.statItem}>
            <p>团队内排名</p>
            <p>
              8<span> / 24</span>
            </p>
          </div>
          <div className={workstyles.statItem}>
            <p>项目访问</p>
            <p>2,223</p>
          </div>
        </div>
      );

    return (
      <PageHeaderWrapper
        loading={currentUserLoading}
        content={pageHeaderContent}
        extraContent={extraContent}
      >
        <GridContent>
          <Suspense fallback={<PageLoading />}>
            <PowerIntroduce 
              dropdownGroup={dropdownGroup}
            />
         
          </Suspense>
          <b>< a href='http://localhost/index.html'><b>Machine Learning Click here</b></a></b>
          <Suspense fallback={null}>
            <TemperatureCard
              rangePickerValue={rangePickerValue}
              temperatureData={demoTemperature}
              isActive={this.isActive}
              handleRangePickerChange={this.handleRangePickerChange}
              loading={loading}
              selectDate={this.selectDate}
            />
          </Suspense>
          <Suspense fallback={null}>
            <BottomAnalysis
              activeKey={activeKey}
              loading={loading} 
              roomData={roomData}
              temperatureData={timechartTemp}
              handleTabChange={this.handleTabChange}
              costData={costData}
            />
          </Suspense>  
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default props => (
  <AsyncLoadBizCharts>
    <DemoDashboard {...props} />
  </AsyncLoadBizCharts>
);

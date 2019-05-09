import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import { footer } from '../defaultSettings'

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'home',
          title: 'Home Page',
          href: '#',
          blankTarget: true,
        },
        ...footer.links.map(link => { return {
          key: link.name,
          title: link.icon? <Icon type={link.icon} />:<Icon type={link.name} />,
          href: link.url,
          blankTarget: true,
        }}),
      ]}
      copyright={
        <Fragment>
          Powered by <a href='https://pro.ant.design'>Ant Design Pro</a>  |
          Copyright <Icon type="copyright" /> { footer.copyright }
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;

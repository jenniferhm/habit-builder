import React from 'react';
import {Button, Card, Icon, Avatar, Calendar, Badge, Checkbox, Descriptions, Layout, Menu, SubMenu} from 'antd';
import moment from "moment";

const {Header, Footer, Sider, Content} = Layout;

function dateCellRender(value) {
    let daysInProgress = new Set([13,14,15,16]);
    // day is not 2020-02-16 && is previous days
    let isCheck = value._d < moment() && !daysInProgress.has(value._d.getDate());
    return (
        <ul className="events">
            <Checkbox checked={isCheck}>Today Done!</Checkbox>
        </ul>
    );
}

function getMonthData(value) {
    if (value.month() === 8) {
        return 1394;
    }
}

function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
        <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
        </div>
    ) : null;
}

function getStartDate(props) {
    return moment();
}

const ChallengePage = (props) => {
    console.log(props.challenge_id);

    return (
        <div>
            <Layout>
                <Sider style={{background: '#fff', padding: 0}} >
                    <div className="logo" />
                    <Menu mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span className="nav-text">Current days: 15</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span className="nav-text">Amount: $13.00</span>
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout>
                    <Header style={{background: '#fff', padding: 0, textAlign: 'center'}}>walk my dog</Header>
                    <Content>
                        <Calendar defaultValue={getStartDate(props)} dateCellRender={dateCellRender}
                                  monthCellRender={monthCellRender}/>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        <Checkbox>Complete challenge!</Checkbox>
                    </Footer>
                </Layout>
            </Layout>
        </div>
    )
}

export default ChallengePage;
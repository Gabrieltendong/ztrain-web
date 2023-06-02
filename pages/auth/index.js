import { useState, useRef } from "react";
import useTranslation from 'next-translate/useTranslation'


import styles from './style.module.scss'
import { useRouter } from "next/router";
import ReactFlagsSelect from "react-flags-select";
import { Modal } from 'antd';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Tabs } from '@mui/material';
import Login from "../../components/Auth/login";
import Register from "../../components/Auth/register";


const AuthScreen = ({open, onOk, onCancel}) => {

  const router = useRouter()
  const { t, lang } = useTranslation();
  const [value, setValue] = useState('1');


  const handleLocaleChange = (event) => {
    // const value = event.target.value;
    const value = event == "US"?"en":"fr" 

    router.push(router.route, router.asPath, {
      locale: value,
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Modal
      open={open} 
      onOk={onOk} 
      onCancel={onCancel}
      width={'90%'}
      style={{height: '50%'}}
      footer={[]}
    >
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={[styles.col_1]}>
              <div id = {styles.content_header_title}>
                <h1 className={styles.header_title}>{t('common:welcome')}!!!</h1>
                <p className={styles.header_subTitle}>{t('common:slogan')}...</p>
              </div>
          </div>
          <div className={styles.col_2}>
            <ReactFlagsSelect
              id={styles.local}
              countries={["US","FR"]}
              customLabels={{ US: "En",FR: "Fr"}}
              fullWidth={false}
              alignOptionsToRight
              selected={router.locale=="en"?"US":"FR"}
              onSelect={handleLocaleChange}
            />
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList  onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Connexion" value="1" />
                    <Tab label="Inscription" value="2" />
                </TabList>
                </Box>
                <TabPanel value="1">
                    <Login onClose = {onCancel} />
                </TabPanel>
                <TabPanel value="2">
                    <Register onClose = {onCancel} />
                </TabPanel>
            </TabContext>
          </div>
        </main>
      </div>
    </Modal>
  );
}

export default AuthScreen;
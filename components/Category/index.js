import { Box } from '@mui/material'
import React from 'react'

import styles from './style.module.scss'

function Category() {
  return (
    <Box 
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'center'}
        flexWrap={'wrap'}
        gap={3}
        sx={{paddingX: 15, marginTop: 20, marginBottom: 10}}
    >
      <div className={styles.card_wrapper}>
        <div className={styles.card_img_wrapper}>
            <img src='/assets/pexels-elvis-2528118.jpg' className={styles.card_img}  />
        </div>
        <h3>Ordinateurs</h3>
      </div>
      <div className={styles.card_wrapper}>
        <div className={styles.card_img_wrapper}>
            <img src='/assets/pexels-klaus-nielsen-6303682.jpg' className={styles.card_img}  />
        </div>
        <h3>Vetements</h3>
      </div>
      <div className={styles.card_wrapper}>
        <div className={styles.card_img_wrapper}>
            <img src='/assets/pexels-sarah-shi-14438772.jpg' className={styles.card_img}  />
        </div>
        <h3>Telephone</h3>
      </div>
      <div className={styles.card_wrapper}>
        <div className={styles.card_img_wrapper}>
            <img src='/assets/pexels-shyam-mishra-13457494.jpg' className={styles.card_img}  />
        </div>
        <h3>Chaussures</h3>
      </div>
    </Box>
  )
}

export default Category

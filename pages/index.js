import Head from 'next/head'
import DataDeckLayout, { siteTitle } from '../components/dataDeckLayout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Dragger from '../components/dragger'

export default function Home({ allPostsData }) {
  return (
    <DataDeckLayout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
          <div className={utilStyles.headingLg}><a href="https://www.digmap.com/platform/landvision/" target="_blank">LandVision</a> Upload</div>
          <Dragger/>
      </section>
    </DataDeckLayout>
  )
}

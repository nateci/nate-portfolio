// pages/explorer/desktop.tsx
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Icons from '../../../components/modules/Icons/Icons';
import FileExplorer from '../../../components/windows/FileExplorer/FileExplorer';
import styles from '../../../styles/utils/List.module.css';
import { desktopFiles } from '../../../data/fileIndex';
import type { FileItem } from '../../../components/utils/types/fileList';

function Desktop() {
  const content = () => {
    return (
      <>
        <div className={styles.listItemContainer}>
          {desktopFiles.map((file: FileItem, index: number) => (
            <Link href={file.path} passHref key={`${file.name}-${index}`}>
              <div className={styles.listItem}>
                <div className={styles.listItemName}>
                  <Image
                    src={file.icon}
                    alt={`${file.name} icon`}
                    width={16}
                    height={16}
                  />
                  <p>{file.name}</p>
                </div>
                <p className={styles.listItemDateModified}>
                  {file.dateModified}
                </p>
                <p className={styles.listItemType}>{file.fileType}</p>
                <p className={styles.listItemSize}>{file.size}</p>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>nateci - Desktop</title>
        <link
          rel="canonical"
          href="https://www.natecirino.com/explorer/desktop"
        />
        <meta
          name="description"
          content="My desktop is beautiful until I start some project and then my desktop is full of temporary files and folders. I don't want to see them."
        />
        <meta property="og:title" content="nateci - Desktop" />
        <meta
          property="og:url"
          content="https://www.natecirino.com/explorer/desktop"
        />
        <meta
          property="og:description"
          content="My desktop is beautiful until I start some project and then my desktop is full of temporary files and folders. I don't want to see them."
        />
      </Head>
      <div style={{ height: '100%' }}>
        <FileExplorer
          icon="desktop"
          folder="Desktop"
          topNav={true}
          component={content()}
        />
        <Icons />
      </div>
    </>
  );
}

export default Desktop;


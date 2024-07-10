import React, { useEffect, useState } from 'react';
import styles from './main_view.module.css';
import MainBusiness, { PageState, PageProps } from './main_business';
import GcHeader from '../../global_components/gc_header/main_view';
import GcFooter from '../../global_components/gc_footer/main_view';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

const MainView: React.FC<PageProps> = (props) => {
  // (보일러 플레이트 코드)
  // 페이지 Business 객체
  const [mainBusiness] = useState(() => props.mainBusiness || new MainBusiness());
  mainBusiness.pageProps = props;

  // 페이지 State 생성 및 mainBusiness 에 할당
  const [pageState, setPageState] =
    React.useState<PageState>(mainBusiness.pageState);
  mainBusiness.pageState = pageState;
  mainBusiness.setPageState = setPageState;

  // 페이지 생명주기를 mainBusiness 로 전달
  useEffect(() => {
    mainBusiness.componentDidMount();
    return () => {
      mainBusiness.componentWillUnmount();
    }
  }, []);

  //----------------------------------------------------------------------------
  // (페이지 화면 구성 코드)
  const Row = ({ index, style }: ListChildComponentProps) => (
    <div style={style} onClick={pageState.items[index].onItemClicked}>
      {pageState.items[index].itemTitle}
    </div>
  );

  return (
    <div className={styles.MainView}>
      <GcHeader headerTitle='홈' />

      <List height={400} itemCount={pageState.items.length} itemSize={35} width={300} >
        {Row}
      </List>

      <GcFooter footerMsg='by Railly' />
    </div>
  );
};

export default MainView;
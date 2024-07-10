import React, { useEffect, useState } from 'react';
import styles from './view.module.css';
import Business, { State, Props } from './business';
import { useNavigate } from 'react-router-dom';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

import GcHeader from '../../global_components/gc_header/view';
import GcFooter from '../../global_components/gc_footer/view';

// [함수형 컴포넌트 뷰]
const View: React.FC<Props> = (props) => {
  // (보일러 플레이트 코드)
  // 컴포넌트 Business 객체
  const mainBusiness: Business = useState(() => props.business || new Business())[0];
  mainBusiness.mainProps = props;

  // 컴포넌트 State 생성 및 mainBusiness 에 할당
  const [mainState, setMainState]: [State, React.Dispatch<React.SetStateAction<State>>] =
    React.useState<State>(mainBusiness.mainState);
  mainBusiness.mainState = mainState;
  mainBusiness.setMainState = setMainState;

  // 컴포넌트 생명주기를 mainBusiness 로 전달
  useEffect(() => {
    mainBusiness.componentDidMount();
    return () => {
      mainBusiness.componentWillUnmount();
    }
  }, []);

  // navigate 객체를 mainBusiness 로 전달
  mainBusiness.navigate = useNavigate();

  //----------------------------------------------------------------------------
  // (컴포넌트 화면 구성 코드)
  const Row = ({ index, style }: ListChildComponentProps) => (
    <div style={style} onClick={mainState.items[index].onItemClicked}>
      {mainState.items[index].itemTitle}
    </div>
  );

  return (
    <div className={styles.MainView}>
      <GcHeader headerTitle='홈' business={mainState.gcHeaderBusiness} />

      <List height={400} itemCount={mainState.items.length} itemSize={35} width={300} >
        {Row}
      </List>

      <GcFooter footerMsg='by Railly' business={mainState.gcFooterBusiness} />
    </div>
  );
};

export default View;
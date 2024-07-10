import React, { useEffect, useState } from 'react';
import styles from './view.module.css';
import Business, { State, Props } from './business';

// [함수형 컴포넌트 뷰]
const View: React.FC<Props> = (props) => {
  // (보일러 플레이트 코드)
  // 컴포넌트 Business 객체
  const [mainBusiness] = useState(() => props.business || new Business());
  mainBusiness.mainProps = props;

  // 컴포넌트 State 생성 및 mainBusiness 에 할당
  const [mainState, setMainState] = React.useState<State>(mainBusiness.mainState);
  mainBusiness.mainState = mainState;
  mainBusiness.setMainState = setMainState;

  // 컴포넌트 생명주기를 mainBusiness 로 전달
  useEffect(() => {
    mainBusiness.componentDidMount();
    return () => {
      mainBusiness.componentWillUnmount();
    }
  }, []);

  //----------------------------------------------------------------------------
  // (컴포넌트 화면 구성 코드)

  return (
    <div className={styles.MainView}>
      <footer>
        <div>{mainBusiness.mainProps.footerMsg}</div>
      </footer>
    </div>
  );
};

export default View;
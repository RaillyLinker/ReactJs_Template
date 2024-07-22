import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './view.module.css';
import Business, { Props } from './business';

// [함수형 컴포넌트 뷰]
const View: React.FC<Props> = (props) => {
  // (보일러 플레이트 코드)
  // 컴포넌트 Business 객체 = 비즈니스 객체는 컴포넌트를 사용하는 외부에서 받아와야만 합니다.
  const mainBusiness: Business = props.business;

  // 컴포넌트 생명주기를 mainBusiness 로 전달
  useEffect(() => {
    mainBusiness.onComponentDidMount(mainBusiness.firstStart);
    mainBusiness.firstStart = false;
    return () => {
      mainBusiness.onComponentWillUnmount();
    }
  }, []);

  // mainBusiness 에 컴포넌트에서만 생성 가능한 변수 할당
  mainBusiness.setScreenFlag = React.useState<boolean>(mainBusiness.screenFlag)[1];
  mainBusiness.navigate = useNavigate();

  //----------------------------------------------------------------------------
  // (컴포넌트 화면 구성 코드)
  return (
    <div className={styles.MainView}>
      <footer>
        <div>{mainBusiness.footerMsg}</div>
      </footer>
    </div>
  );
};

export default View;
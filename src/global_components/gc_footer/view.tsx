import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './view.module.css';
import Business, { State, Props } from './business';

// [함수형 컴포넌트 뷰]
const View: React.FC<Props> = (props) => {
  // (보일러 플레이트 코드)
  // 컴포넌트 Business 객체 = 비즈니스 객체는 컴포넌트를 사용하는 외부에서 받아와야만 합니다.
  const mainBusiness: Business = props.business;

  // 컴포넌트 생명주기를 mainBusiness 로 전달
  useEffect(() => {
    mainBusiness.onComponentDidMount();
    return () => {
      mainBusiness.onComponentWillUnmount();
    }
  }, []);

  // mainBusiness 에 컴포넌트에서만 생성 가능한 변수 할당
  mainBusiness.setMainState = React.useState<any>(mainBusiness.mainState)[1];
  mainBusiness.navigate = useNavigate();

  //----------------------------------------------------------------------------
  // (진입 에러 발생 화면 구성 코드)
  // 페이지 구성에 필요한 State 가 undefined 일 경우 보여줄 화면을 반환하세요.
  if (mainBusiness.mainState == undefined) {
    return (
      <div className={styles.MainView}>
        Error
      </div>
    );
  }

  // 페이지 진입 필수정보가 null 이 아니라고 검증된 시점
  const mainState: State = mainBusiness.mainState!;

  //----------------------------------------------------------------------------
  // (컴포넌트 화면 구성 코드)
  return (
    <div className={styles.MainView}>
      <footer>
        <div>{mainState.footerMsg}</div>
      </footer>
    </div>
  );
};

export default View;
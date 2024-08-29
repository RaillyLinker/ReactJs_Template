import React, { useEffect, useRef, useState } from 'react';
import styles from './view.module.css';
import Business from './business';
import { DialogProps } from '../../global_classes/gc_template_classes';


// [뷰 함수]
const View: React.FC<Props> = (props) => {
  // (보일러 플레이트 코드)
  // 컴포넌트 Business 객체 = 비즈니스 객체는 컴포넌트를 사용하는 외부에서 받아와야만 합니다.
  const mainBusiness: Business = props.business;

  // 컴포넌트 생명주기를 mainBusiness 로 전달
  useEffect(() => {
    mainBusiness.onComponentDidMount(mainBusiness.firstMount);
    mainBusiness.firstMount = false;
    return () => {
      mainBusiness.onComponentWillUnmount();
    }
  }, [mainBusiness]);

  // State 할당
  [mainBusiness.screenFlag, mainBusiness.setScreenFlag] = React.useState<{}>(mainBusiness.screenFlag);


  // !!!아래부터 코딩!!!
  //----------------------------------------------------------------------------
  // (컴포넌트에서만 실행 가능한 함수 사용)
  // useRef, useState 와 같은 컴포넌트 전용 함수를 사용하세요.


  //----------------------------------------------------------------------------
  // (컴포넌트 화면 구성 코드)
  return (
    <div id={styles.MainView}>
      <div id={styles.Top}>{mainBusiness.title}</div>
      <div id={styles.Middle}>{mainBusiness.content}</div>
      <hr />
      <div id={styles.Bottom}>
        <button id={styles.Button} onClick={mainBusiness.onConfirmButtonClick}>확인</button>
      </div>
    </div>
  );
};


//----------------------------------------------------------------------------
// [Props VO 클래스]
// !!!business, children 이외 필요한 Props 는 이곳에 선언!!!
interface Props extends DialogProps<Business> {
}

export default View;
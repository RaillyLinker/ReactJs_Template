import React, { useEffect } from 'react';
import styles from './view.module.css';
import Business from './business';
import { ComponentProps } from '../../global_classes/gc_template_classes';


// [뷰 함수]
const View: React.FC<ComponentProps<Business>> = (props) => {
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
      {
        mainBusiness.imageState === 0 &&
        <div id={styles.LoadingElement}>{mainBusiness.loadingElement}</div>
      }
      {
        mainBusiness.imageState === -1 &&
        <div id={styles.LoadingFailedElement}>{mainBusiness.loadingFailedElement}</div>
      }
      <img
        src={mainBusiness.imageSrc}
        alt={mainBusiness.imageAlt}
        onLoad={() => {
          mainBusiness.imageState = 1;
          mainBusiness.reRender();
        }}
        onError={() => {
          mainBusiness.imageState = -1;
          mainBusiness.reRender();
        }}
        style={{ display: mainBusiness.imageState === 0 || mainBusiness.imageState === -1 ? 'none' : 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default View;
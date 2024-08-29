import React, { useEffect, useRef, useState } from 'react';
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

  // 스크롤 위치 유지 처리 코드 뭉치
  mainBusiness.contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (mainBusiness.contentRef !== null && mainBusiness.contentRef.current) {
        mainBusiness.contentScrollTop = mainBusiness.contentRef.current.scrollTop;
        mainBusiness.contentScrollLeft = mainBusiness.contentRef.current.scrollLeft;
      }
    };

    if (mainBusiness.contentRef !== null && mainBusiness.contentRef.current) {
      mainBusiness.contentRef.current.scrollTop = mainBusiness.contentScrollTop;
      mainBusiness.contentRef.current.scrollLeft = mainBusiness.contentScrollLeft;
      mainBusiness.contentRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (mainBusiness.contentRef !== null && mainBusiness.contentRef.current) {
        mainBusiness.contentRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [mainBusiness]);


  //----------------------------------------------------------------------------
  // (컴포넌트 화면 구성 코드)
  return (
    <div id={styles.MainView}>
      <header>
        <h1 id={styles.HeaderTitleContainer}>
          <img id={styles.GoToHomeLogo} src="/logo192.png" alt="Logo" onClick={mainBusiness.goToHome} />
          <span id={styles.HeaderTitle}>{mainBusiness.headerTitle}</span>
        </h1>
      </header>

      <div id={styles.Content} ref={mainBusiness.contentRef}>
        {props.children}
      </div>

    </div>
  );
};

export default View;
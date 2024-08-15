import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './view.module.css';
import Business from './business';

// [함수형 컴포넌트 뷰]
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

  // 필요 객체 할당
  mainBusiness.setScreenFlag = React.useState<boolean>(mainBusiness.screenFlag)[1];
  mainBusiness.navigate = useNavigate();


  // !!!아래부터 코딩!!!
  //----------------------------------------------------------------------------
  // (컴포넌트에서만 실행 가능한 함수 사용)
  // useRef, useState 와 같은 컴포넌트 전용 함수를 사용하세요.

  // 다이얼로그 레퍼런스
  mainBusiness.dialogRef = useRef<HTMLDialogElement>(null);


  //----------------------------------------------------------------------------
  // (컴포넌트 화면 구성 코드)
  return (
    <div id={styles.MainView}>

      {props.children}

      <dialog
        ref={mainBusiness.dialogRef}
        onClick={
          // 다이얼로그 외곽 클릭
          (event) => {
            if (
              mainBusiness.dialogRef !== null &&
              event.target === mainBusiness.dialogRef.current &&
              // 다이얼로그 외곽 클릭시 종료 설정이 된 경우
              mainBusiness.dialogBarrierDismissible
            ) {
              // 다이얼로그 종료
              mainBusiness.closeDialog();
            }
          }
        }
        style={{ backgroundColor: 'transparent', outline: 'none', border: 'none' }}>
        <div onClick={(event) => { event.stopPropagation(); }}>
          <mainBusiness.dialogView business={mainBusiness.dialogBusiness} />
        </div>
      </dialog>

    </div>
  );
};

//----------------------------------------------------------------------------
// [컴포넌트 Props 인터페이스 - 변경하지 마세요]
export interface Props {
  // (view 와 연결되는 Business 객체)
  // 비즈니스 객체는 컴포넌트를 사용하는 외부에서 받아와야만 합니다.
  business: Business;

  // (컴포넌트 Children 객체)
  // <MyTag> ... </MyTag>
  // 위와 같이 태그와 태그 사이에 입력한 컴포넌트는 여기서 받습니다.
  // 만약 <MyTag /> 이렇게 태그 사이를 설정하지 않았다면 null 로 받습니다.
  children?: React.ReactNode;
}

export default View;
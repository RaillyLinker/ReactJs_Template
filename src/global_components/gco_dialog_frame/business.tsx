import { DialogProps, DialogBusinessBasic } from '../../global_classes/gc_template_classes';
import React from 'react';
import { ComponentBusinessBasic, BusinessBasic, VoidDialogBusinessBasic } from '../../global_classes/gc_template_classes';

import styles from './view.module.css';


// [비즈니스 클래스]
class Business extends ComponentBusinessBasic {
  // [멤버 변수 공간]
  // 멤버 변수는 비즈니스 클래스를 지닌 부모 컴포넌트가 히스토리에서 삭제될 때까지 유지됩니다.

  // (다이얼로그 레퍼런스 객체)
  dialogRef: React.RefObject<HTMLDialogElement> | null = null;
  // (다이얼로그 외곽을 클릭시 다이얼로그를 종료할지 여부)
  dialogBarrierDismissible: boolean = true;
  // (다이얼로그가 현재 실행중인지 여부)
  dialogOn: boolean = false;

  // (다이얼로그 뷰 컴포넌트)
  dialogView: React.FC<DialogProps<any>> = () => { return (<></>) };
  // (다이얼로그 뷰 컴포넌트 비즈니스)
  dialogBusiness: DialogBusinessBasic = new VoidDialogBusinessBasic(this, this.parentComponentBusiness);

  openAnimationClassName: string | null = null;
  closeAnimationClassName: string | null = null;


  //----------------------------------------------------------------------------
  // [생명주기 함수]
  // (비즈니스 클래스 생성자)
  // 부모 컴포넌트에서 값을 받을 때는 이곳으로 받습니다.
  constructor(
    parentComponentBusiness: BusinessBasic
  ) {
    super(parentComponentBusiness);
  }

  // (컴포넌트가 마운트된 직 후)
  // 컴포넌트가 마운트된 직 후에 호출됩니다. 
  // DOM 노드가 있어야 하는 초기화 작업은 이 메서드에서 이루어지면 됩니다.
  // 외부에서 데이터를 불러와야 한다면 네트워크 요청을 보내기 적절한 위치라고 할 수 있습니다.
  onComponentDidMount = (firstMount: boolean) => {
    if (this.dialogOn) {
      if (this.dialogRef !== null && this.dialogRef.current !== null) {
        this.dialogRef.current.showModal();
      }
    }
  }

  // (컴포넌트가 마운트 해제되어 제거되기 직전)
  // 컴포넌트가 마운트 해제되어 제거되기 직전에 호출됩니다. 
  // 이 메서드 내에서 타이머 제거, 네트워크 요청 취소, componentDidMount() 내에서 생성된 구독 해제 등 필요한 모든 정리 작업을 수행하세요.
  // 이제 컴포넌트는 다시 렌더링되지 않으므로, componentWillUnmount() 내에서 setState()를 호출하면 안 됩니다. 
  // 컴포넌트 인스턴스가 마운트 해제되고 나면, 절대로 다시 마운트되지 않습니다.
  onComponentWillUnmount = () => {
  }


  //----------------------------------------------------------------------------
  // [public 함수]
  // (다이얼로그 호출 함수)
  // 다이얼로그 호출시엔 반드시 이 함수를 사용하세요.
  showDialog = (
    dialogBarrierDismissible: boolean,
    dialogView: React.FC<DialogProps<any>>,
    dialogBusiness: DialogBusinessBasic
  ) => {
    if (this.dialogRef !== null && this.dialogRef.current !== null) {
      const dialog = this.dialogRef.current;

      this.dialogBarrierDismissible = dialogBarrierDismissible;
      this.dialogView = dialogView;
      this.dialogBusiness = dialogBusiness;
      this.reRender();
      this.dialogRef.current.showModal();

      if (this.openAnimationClassName === null) {
        this.dialogOn = true;
      } else {
        dialog.classList.add(this.openAnimationClassName);

        dialog.addEventListener('animationend', () => {
          if (this.openAnimationClassName !== null) {
            dialog.classList.remove(this.openAnimationClassName);
          }
          this.dialogOn = true;
        }, { once: true });
      }
    }
  }

  // (다이얼로그 종료 함수)
  // 다이얼로그 종료시엔 반드시 이 함수를 사용하세요.
  closeDialog = () => {
    if (this.dialogRef !== null && this.dialogRef.current !== null) {
      const dialog = this.dialogRef.current;

      if (this.closeAnimationClassName === null) {
        dialog.close();
        this.dialogOn = false;
        this.dialogView = () => { return (<></>) };
        this.dialogBusiness = new VoidDialogBusinessBasic(this, this.parentComponentBusiness);
        this.reRender();
      } else {
        dialog.classList.add(this.closeAnimationClassName);
        dialog.addEventListener('animationend', () => {
          dialog.close();
          if (this.closeAnimationClassName !== null) {
            dialog.classList.remove(this.closeAnimationClassName);
          }
          this.dialogOn = false;
          this.dialogView = () => { return (<></>) };
          this.dialogBusiness = new VoidDialogBusinessBasic(this, this.parentComponentBusiness);
          this.reRender();
        }, { once: true });
      }
    }
  }

  // (다이얼로그 호출, 종료 애니메이션 설정)
  /*
    (CSS 예시)
    .dialogOpenAnim_fadeIn {
        animation: DialogOpenAnim_FadeIn 0.3s forwards;
    }

    @keyframes DialogOpenAnim_FadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }

        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    .dialogCloseAnim_fadeOut {
        animation: DialogCloseAnim_fadeOut 0.3s forwards;
    }

    @keyframes DialogCloseAnim_fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }

        to {
            opacity: 0;
            transform: scale(0.9);
        }
    }

    (코드 예시)
    setDialogAnimation(
      styles['dialogOpenAnim_fadeIn'],
      styles['dialogCloseAnim_fadeOut']
    )
  */
  setDialogAnimation = (
    openAnimationClassName: string | null | undefined,
    closeAnimationClassName: string | null | undefined
  ) => {
    if (openAnimationClassName === undefined) {
      this.openAnimationClassName = null;
    } else {
      this.openAnimationClassName = openAnimationClassName;
    }

    if (closeAnimationClassName === undefined) {
      this.closeAnimationClassName = null;
    } else {
      this.closeAnimationClassName = closeAnimationClassName;
    }
  }

  setDialogOpenAnimation = (
    openAnimationClassName: string | null | undefined
  ) => {
    if (openAnimationClassName === undefined) {
      this.openAnimationClassName = null;
    } else {
      this.openAnimationClassName = openAnimationClassName;
    }
  }

  setDialogCloseAnimation = (
    closeAnimationClassName: string | null | undefined
  ) => {
    if (closeAnimationClassName === undefined) {
      this.closeAnimationClassName = null;
    } else {
      this.closeAnimationClassName = closeAnimationClassName;
    }
  }


  //----------------------------------------------------------------------------
  // [private 함수]
}

export default Business;
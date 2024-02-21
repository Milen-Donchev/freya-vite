import React, { createRef, FC, useEffect, useState } from 'react';
import isEmpty from 'lodash/fp/isEmpty';
import { Manager, Popper, Reference } from 'react-popper';
import { useClickOutside, useTabOutside } from '@components/meeting/hooks';
import KeyCodes from '@components/meeting/enums/KeyCodes';
import { StyledPopOver, StyledPopOverMenu, StyledPopOverToggle, PopOverProps } from './Styled';

const getFocusableElements = (node: HTMLElement): NodeListOf<HTMLElement> => {
  return node.querySelectorAll('div, button, [href]');
};

const PopOver: FC<React.PropsWithChildren<PopOverProps>> = ({
  renderButton,
  renderButtonWrapper,
  onPopOverClick,
  children,
  isSubMenu = false,
  placement = 'bottom-start',
  dropdown = false,
  className,
  disabled,
  closeOnClick = true,
  ...rest
}: PopOverProps) => {
  const menuRef = createRef<HTMLDivElement>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && !!menuRef.current) {
      const nodes = getFocusableElements(menuRef.current);

      if (!isEmpty(nodes)) {
        nodes[0].focus();
      }
    }
  }, [isOpen, menuRef]);

  const move = (direction: string) => {
    const node = menuRef.current;

    if (isSubMenu) {
      // the parent menu can access
      // child nodes and manage focused elements
      return;
    }
    if (node) {
      const nodes = getFocusableElements(node);
      const currentElement = document.activeElement;

      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] === currentElement) {
          if (direction === 'down' && i !== nodes.length - 1) {
            return nodes[i + 1].focus();
          }

          if (direction === 'up' && i > 0) {
            return nodes[i - 1].focus();
          }
          break;
        }
      }
    }
  };

  const closePopover = (e: any) => {
    if (!closeOnClick) {
      return;
    }
    const isSubMenuButton = e.target.closest("[data-menu='submenu']");
    return !isSubMenuButton ? setIsOpen(false) : false;
  };

  const handleKeyUp = (e: any) => {
    switch (e.keyCode) {
      case KeyCodes.ESCAPE:
        return setIsOpen(false);
      case KeyCodes.ARROW_UP:
        return move('up');
      case KeyCodes.ARROW_DOWN:
        return move('down');
    }
  };

  const handlePopOverClick = () => {
    setIsOpen(!isOpen);
    if (onPopOverClick) {
      onPopOverClick(isOpen);
    }
  };

  useClickOutside(menuRef, () => setIsOpen(false));
  useTabOutside(menuRef, () => setIsOpen(false));

  return (
    <StyledPopOver ref={menuRef} onKeyDown={handleKeyUp} disabled={disabled}>
      <Manager>
        <Reference>
          {({ ref }: any) => {
            const props = {
              ref,
              className: `ch-popover-toggle ${className ?? ''}`,
              onClick: handlePopOverClick,
              disabled,
              'data-menu': isSubMenu ? 'submenu' : null,
              'aria-haspopup': true,
              'aria-expanded': isOpen
            };

            if (renderButton) {
              return (
                <StyledPopOverToggle dropdown={dropdown} {...props}>
                  {renderButton(isOpen)}
                </StyledPopOverToggle>
              );
            }

            if (renderButtonWrapper) {
              return <span ref={props.ref}>{renderButtonWrapper(isOpen, { ...props, rest })}</span>;
            }

            return null;
          }}
        </Reference>
        {isOpen && !disabled && (
          <Popper
            placement={placement}
            modifiers={[
              {
                name: 'offset',
                options: {
                  offset: [dropdown ? 0 : 0, dropdown ? 4 : 4]
                }
              }
            ]}
            {...rest}>
            {({ ref, style }: any) => (
              <StyledPopOverMenu
                onClick={(e: any) => closePopover(e)}
                ref={ref}
                style={style}
                className="ch-popover-menu">
                {children}
              </StyledPopOverMenu>
            )}
          </Popper>
        )}
      </Manager>
    </StyledPopOver>
  );
};

export default PopOver;

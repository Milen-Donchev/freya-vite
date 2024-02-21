import React from 'react';
import classNames from 'classnames';

interface BurgerMenuButtonProps {
  isBurgerMenuOpen: boolean;
  toggleBurgerMenu: () => void;
}

const BurgerMenuButton = (props: BurgerMenuButtonProps) => {
  const { isBurgerMenuOpen, toggleBurgerMenu } = props;

  return (
    <div
      onClick={toggleBurgerMenu}
      className="cursor-pointer d-flex align-items-center text-primary"
      data-testid="toggle-burger-menu">
      <i
        className={classNames('fa-light', 'fa-bars', 'fs-28 smooth-transition', {
          'opacity-1': !isBurgerMenuOpen,
          'opacity-0': isBurgerMenuOpen
        })}
      />
      <i
        className={classNames(
          'fa-light',
          'fs-28',
          'fa-circle-xmark',
          'position-absolute',
          'smooth-transition',
          {
            'opacity-1': isBurgerMenuOpen,
            'opacity-0': !isBurgerMenuOpen
          }
        )}
      />
    </div>
  );
};

export default BurgerMenuButton;

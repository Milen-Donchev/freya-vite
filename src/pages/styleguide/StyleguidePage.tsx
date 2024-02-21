import React, { useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';

import { Popup } from '@freya/components/ui/popup/Popup';

const StyleguidePage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const colorScheme = [
    'primary',
    'secondary',
    'tertiary',
    'quarterly',
    'info',
    'success',
    'warning',
    'danger',
    'dark',
    'light'
  ] as const;

  const nuances = [700, 600, 500, 400, 300, 200, 100];

  // @ts-ignore
  return (
    <div className="m-20">
      <h1 className="mb-32">Styleguide</h1>
      <h3 className="my-32 fw-bold">Colors</h3>
      <div>
        <h4 className="mb-20">Color Scheme</h4>
        {colorScheme.map((color: string) => (
          <div key={color} className="d-inline-block">
            {color}
            <div className={`width-8 height-3 bg-${color} d-block`}></div>
          </div>
        ))}
      </div>
      <div className="d-inline-block me-12">
        <h4 className="my-16">gray</h4>
        <div className="width-4 height-4 bg-gray-500 d-inline-block"></div>
        <div className="width-4 height-4 bg-gray-400 d-inline-block"></div>
        <div className="width-4 height-4 bg-gray-300 d-inline-block"></div>
        <div className="width-4 height-4 bg-gray-200 d-inline-block"></div>
        <div className="width-4 height-4 bg-gray-100 d-inline-block"></div>
      </div>
      {colorScheme.map(
        (color: string) =>
          color !== 'dark' &&
          color !== 'light' && (
            <div key={color} className="d-inline-block me-12">
              <h4 className="my-16">{color}</h4>
              {nuances.map((nuance: number) => (
                <div
                  key={nuance}
                  className={`width-4 height-4 bg-${color}-${nuance} d-inline-block`}></div>
              ))}
            </div>
          )
      )}

      <h3 className="my-32 fw-bold">Buttons</h3>
      <h4 className="my-24">Button Sizes</h4>
      <button className="btn btn-primary btn-xl me-12">Extra Large</button>
      <button className="btn btn-primary btn-lg me-12">Large</button>
      <button className="btn btn-primary me-12">Medium</button>
      <button className="btn btn-primary btn-sm me-12">Small</button>
      {/* Button Variants */}
      <h4 className="my-24">Button Variants</h4>
      <div className="mb-12">
        <button className="btn btn-primary me-12">Primary</button>
        <button className="btn btn-secondary me-12">Secondary</button>
        <button className="btn btn-tertiary me-12">Tertiary</button>
        <button className="btn btn-quarterly me-12">Quarterly</button>
      </div>
      <div className="mb-12">
        <button className="btn btn-outline-primary me-12">Primary Outline</button>
        <button className="btn btn-outline-secondary me-12">Secoundary Outline</button>
        <button className="btn btn-outline-tertiary me-12">Tertiary Outline</button>
        <button className="btn btn-outline-quarterly me-12">Quarterly Outline</button>
      </div>
      <div className="mb-12">
        <button className="btn btn-ghost-primary me-12">Primary Ghost</button>
        <button className="btn btn-ghost-secondary me-12">Secoundary Ghost</button>
        <button className="btn btn-ghost-tertiary me-12">Tertiary Ghost</button>
        <button className="btn btn-ghost-quarterly me-12">Quarterly Ghost</button>
        <button className="btn btn-link me-12">Link button</button>
      </div>
      <h4 className="my-24">Disabled Buttons</h4>
      <div className="mb-12">
        <button className="btn btn-primary me-12" disabled>
          Primary
        </button>
        <button className="btn btn-secondary me-12" disabled>
          Secondary
        </button>
        <button className="btn btn-tertiary me-12" disabled>
          Tertiary
        </button>
        <button className="btn btn-quarterly me-12" disabled>
          Quarterly
        </button>
      </div>
      <div className="mb-12">
        <button className="btn btn-outline-primary me-12" disabled>
          Primary Outline
        </button>
        <button className="btn btn-outline-secondary me-12" disabled>
          Secoundary Outline
        </button>
        <button className="btn btn-outline-tertiary me-12" disabled>
          Tertiary Outline
        </button>
        <button className="btn btn-outline-quarterly me-12" disabled>
          Quarterly Outline
        </button>
      </div>
      <div className="mb-12">
        <button className="btn btn-ghost-primary me-12" disabled>
          Primary Ghost
        </button>
        <button className="btn btn-ghost-secondary me-12" disabled>
          Secoundary Ghost
        </button>
        <button className="btn btn-ghost-tertiary me-12" disabled>
          Tertiary Ghost
        </button>
        <button className="btn btn-ghost-quarterly me-12" disabled>
          Quarterly Ghost
        </button>
        <button className="btn btn-link me-12" disabled>
          Link button
        </button>
      </div>
      <h4 className="my-24">Buttons with Icons</h4>
      <div className="mb-12">
        <button className="btn btn-primary me-12">
          Primary
          <i className="fa-light fa-circle-arrow-right ms-8"></i>
        </button>
        <button className="btn btn-secondary me-12">
          Secondary
          <i className="fa-light fa-circle-arrow-right ms-8"></i>
        </button>
        <button className="btn btn-tertiary me-12">
          Tertiary
          <i className="fa-light fa-circle-arrow-right ms-8"></i>
        </button>
        <button className="btn btn-quarterly me-12">
          Quarterly
          <i className="fa-light fa-circle-arrow-right ms-8"></i>
        </button>
      </div>
      <div className="mb-12">
        <button className="btn btn-outline-primary me-12">
          Outline Primary
          <i className="fa-light fa-circle-arrow-right ms-8"></i>
        </button>
        <button className="btn btn-outline-secondary me-12">
          Outline Secondary
          <i className="fa-light fa-circle-arrow-right ms-8"></i>
        </button>
        <button className="btn btn-outline-tertiary me-12">
          Outline Tertiary
          <i className="fa-light fa-circle-arrow-right ms-8"></i>
        </button>
        <button className="btn btn-outline-quarterly me-12">
          Outline Quarterly
          <i className="fa-light fa-circle-arrow-right ms-8"></i>
        </button>
      </div>
      <div className="mb-12">
        <button className="btn btn-ghost-primary me-12">
          Ghost Primary
          <i className="fa-light fa-circle-arrow-right ms-8"></i>
        </button>
        <button className="btn btn-ghost-secondary me-12">
          Ghost Secondary
          <i className="fa-light fa-circle-arrow-right ms-8"></i>
        </button>
        <button className="btn btn-ghost-tertiary me-12">
          Ghost Tertiary
          <i className="fa-light fa-circle-arrow-right ms-8"></i>
        </button>
        <button className="btn btn-ghost-quarterly me-12">
          Ghost Quarterly
          <i className="fa-light fa-circle-arrow-right ms-8"></i>
        </button>
        <button className="btn btn-link me-12">
          Link
          <i className="fa-light fa-circle-arrow-right ms-8"></i>
        </button>
      </div>
      <h4 className="my-24">Sized Buttons with Icons</h4>
      <div className="mb-12">
        <button className="btn btn-primary btn-sm me-12">
          Primary
          <i className="fa-light fa-circle-arrow-right ms-8"></i>
        </button>
        <button className="btn btn-primary me-12">
          Primary
          <i className="fa-light fa-circle-arrow-right ms-8"></i>
        </button>
        <button className="btn btn-primary btn-lg me-12">
          Primary
          <i className="fa-light fa-circle-arrow-right ms-8"></i>
        </button>
        <button className="btn btn-primary btn-xl me-12">
          Primary
          <i className="fa-light fa-circle-arrow-right ms-8"></i>
        </button>
      </div>
      <h4 className="my-24">Icon Buttons Sizes and Variants</h4>
      <div className="mb-20">
        <button className="btn btn-primary btn-icon btn-sm me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-primary btn-icon me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-primary btn-icon btn-lg me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-primary btn-icon btn-xl me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-outline-primary btn-icon btn-sm me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-outline-primary btn-icon me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-outline-primary btn-icon btn-lg me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-outline-primary btn-icon btn-xl me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-ghost-primary btn-icon btn-sm me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-ghost-primary btn-icon me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-ghost-primary btn-icon btn-lg me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-ghost-primary btn-icon btn-xl me-12">
          <i className="fa-light fa-trash"></i>
        </button>
      </div>
      <div className="mb-20">
        <button className="btn btn-secondary btn-icon btn-sm me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-secondary btn-icon me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-secondary btn-icon btn-lg me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-secondary btn-icon btn-xl me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-outline-secondary btn-icon btn-sm me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-outline-secondary btn-icon me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-outline-secondary btn-icon btn-lg me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-outline-secondary btn-icon btn-xl me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-ghost-secondary btn-icon btn-sm me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-ghost-secondary btn-icon me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-ghost-secondary btn-icon btn-lg me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-ghost-secondary btn-icon btn-xl me-12">
          <i className="fa-light fa-trash"></i>
        </button>
      </div>
      <div className="mb-20">
        <button className="btn btn-tertiary btn-icon btn-sm me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-tertiary btn-icon me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-tertiary btn-icon btn-lg me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-tertiary btn-icon btn-xl me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-outline-tertiary btn-icon btn-sm me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-outline-tertiary btn-icon me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-outline-tertiary btn-icon btn-lg me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-outline-tertiary btn-icon btn-xl me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-ghost-tertiary btn-icon btn-sm me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-ghost-tertiary btn-icon me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-ghost-tertiary btn-icon btn-lg me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-ghost-tertiary btn-icon btn-xl me-12">
          <i className="fa-light fa-trash"></i>
        </button>
      </div>
      <div className="mb-20">
        <button className="btn btn-quarterly btn-icon btn-sm me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-quarterly btn-icon me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-quarterly btn-icon btn-lg me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-quarterly btn-icon btn-xl me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-outline-quarterly btn-icon btn-sm me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-outline-quarterly btn-icon me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-outline-quarterly btn-icon btn-lg me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-outline-quarterly btn-icon btn-xl me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-ghost-quarterly btn-icon btn-sm me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-ghost-quarterly btn-icon me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-ghost-quarterly btn-icon btn-lg me-12">
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-ghost-quarterly btn-icon btn-xl me-12">
          <i className="fa-light fa-trash"></i>
        </button>
      </div>
      <h4 className="my-24">Icon Buttons With Menu Icon</h4>
      <button className="btn btn-outline-primary btn-icon btn-sm me-12">
        <i className="fa-regular fa-ellipsis fs-16"></i>
      </button>
      <button className="btn btn-outline-primary btn-icon me-12">
        <i className="fa-regular fa-ellipsis fs-20"></i>
      </button>
      <button className="btn btn-outline-primary btn-icon btn-lg me-12">
        <i className="fa-regular fa-ellipsis fs-22"></i>
      </button>
      <button className="btn btn-outline-primary btn-icon btn-xl me-12">
        <i className="fa-regular fa-ellipsis fs-32"></i>
      </button>
      <h4 className="my-24">Disabled Icon Buttons</h4>
      <div className="mb-20">
        <button className="btn btn-primary btn-icon btn-sm me-12" disabled>
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-primary btn-icon me-12" disabled>
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-primary btn-icon btn-lg me-12" disabled>
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-primary btn-icon btn-xl me-12" disabled>
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-outline-primary btn-icon btn-sm me-12" disabled>
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-outline-primary btn-icon me-12" disabled>
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-outline-primary btn-icon btn-lg me-12" disabled>
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-outline-primary btn-icon btn-xl me-12" disabled>
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-ghost-primary btn-icon btn-sm me-12" disabled>
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-ghost-primary btn-icon me-12" disabled>
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-ghost-primary btn-icon btn-lg me-12" disabled>
          <i className="fa-light fa-trash"></i>
        </button>
        <button className="btn btn-ghost-primary btn-icon btn-xl me-12" disabled>
          <i className="fa-light fa-trash"></i>
        </button>
      </div>
      <h3 className="my-32 fw-bold">Dropdowns</h3>
      <Dropdown className="dropdown d-inline-block me-12">
        <Dropdown.Toggle as="button" id="dropdown-basic" className="btn btn-primary dropdownToggle">
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-menu">
          <Dropdown.Item className="dropdown-item" href="#/action-1">
            <i className="fa-light fa-pen me-12"></i>
            Action
          </Dropdown.Item>
          <Dropdown.Item className="dropdown-item" as="button">
            <i className="fa-light fa-trash me-12"></i>
            Button Item
          </Dropdown.Item>
          <Dropdown.Item className="dropdown-item" href="#/action-3">
            Something else
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown className="dropdown d-inline-block">
        <Dropdown.Toggle
          as="button"
          id="dropdown-basic"
          className="btn btn-primary btn-icon dropdownToggle">
          <i className="fa-regular fa-ellipsis"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-menu">
          <Dropdown.Item className="dropdown-item" href="#/action-1">
            <i className="fa-light fa-pen me-12"></i>
            Action
          </Dropdown.Item>
          <Dropdown.Item className="dropdown-item" as="button">
            <i className="fa-light fa-trash me-12"></i>
            Button Item
          </Dropdown.Item>
          <Dropdown.Item className="dropdown-item" href="#/action-3">
            Something else
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <h3 className="my-32 fw-bold">Forms</h3>
      <div className="form-floating mb-20">
        <input
          type="email"
          className="form-control"
          id="floatingInput1"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput1">Email address</label>
      </div>
      <div className="form-floating mb-20">
        <input
          type="password"
          className="form-control"
          id="floatingInput2"
          placeholder="Password"
        />
        <label htmlFor="floatingInput2">Password</label>
      </div>
      <div className="form-floating mb-20">
        <textarea
          className="form-control height-8"
          placeholder="Leave a comment here"
          id="floatingTextarea2"></textarea>
        <label htmlFor="floatingTextarea2">Comments</label>
      </div>
      <Form.Select className="mb-20">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </Form.Select>
      <h4 className="mb-20">Disabled</h4>
      <div className="form-floating mb-20">
        <input
          type="password"
          className="form-control"
          id="floatingInput2"
          placeholder="Password"
          disabled
        />
        <label htmlFor="floatingInput2">Password</label>
      </div>
      <h4 className="my-24">Validations</h4>
      <div className="form-floating mb-20">
        <input
          type="email"
          className="form-control is-valid"
          id="floatingInput1"
          placeholder="name@example.com"
          defaultValue="test@mail.com"
        />
        <label htmlFor="floatingInput1">Email address</label>
        <div className="valid-feedback">Looks good!</div>
      </div>
      <div className="form-floating mb-20">
        <input
          type="password"
          className="form-control is-invalid"
          id="floatingInput2"
          placeholder="Password"
          defaultValue="123123"
        />
        <label htmlFor="floatingInput2">Password</label>
        <div className="invalid-feedback">Looks good!</div>
      </div>
      <h4 className="mb-20">Small Inputs</h4>
      <label htmlFor="floatingInput2">Small input</label>
      <input
        type="text"
        className="form-control form-control-sm mb-20"
        id="floatingInput2"
        placeholder=".form-control-sm"
      />
      <h4 className="my-24">Checks and Radios</h4>
      <div className="form-check mb-20">
        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Default checkbox
        </label>
      </div>
      <div className="form-check mb-20">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault2"
          defaultChecked
        />
        <label className="form-check-label" htmlFor="flexCheckDefault2">
          Default checkbox
        </label>
      </div>
      <div className="form-check mb-20">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault3"
          disabled
        />
        <label className="form-check-label" htmlFor="flexCheckDefault3">
          Disabled
        </label>
      </div>
      <div className="form-check mb-20">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault4"
          checked
          disabled
        />
        <label className="form-check-label" htmlFor="flexCheckDefault4">
          Disabled Checked
        </label>
      </div>
      <div className="form-check mb-20">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          value=""
          id="flexRadioDefault"
        />
        <label className="form-check-label" htmlFor="flexRadioDefault">
          Default radio
        </label>
      </div>
      <div className="form-check mb-20">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          value=""
          id="flexRadioDefault2"
          defaultChecked
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          Default radio
        </label>
      </div>
      <div className="form-check mb-20">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          value=""
          id="flexRadioDefault3"
          disabled
        />
        <label className="form-check-label" htmlFor="flexRadioDefault3">
          Disabled
        </label>
      </div>
      <div className="form-check mb-20">
        <input
          className="form-check-input"
          type="radio"
          value=""
          id="flexRadioDefault4"
          checked
          disabled
        />
        <label className="form-check-label" htmlFor="flexRadioDefault4">
          Disabled Checked
        </label>
      </div>
      <div className="form-check form-switch mb-20">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          value=""
          id="form-switch"
        />
        <label className="form-check-label" htmlFor="form-switch">
          Switch
        </label>
      </div>
      <div className="form-check form-switch mb-20">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          value=""
          id="form-switch1"
          defaultChecked
        />
        <label className="form-check-label" htmlFor="form-switch1">
          Switch
        </label>
      </div>
      <div className="form-check form-switch mb-20">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          value=""
          id="form-switch2"
          disabled
        />
        <label className="form-check-label" htmlFor="form-switch2">
          Switch
        </label>
      </div>
      <div className="form-check form-switch mb-20">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          value=""
          id="form-switch3"
          checked
          disabled
        />
        <label className="form-check-label" htmlFor="form-switch3">
          Switch
        </label>
      </div>
      <h3 className="my-32 fw-bold">Popups</h3>
      <button onClick={() => setShow(true)} className="btn btn-primary">
        Sm Popup
      </button>
      <Popup
        show={show}
        onHide={handleClose}
        size="sm"
        title={<div>Title</div>}
        body={<div>Body</div>}
        footer={
          <div className="d-flex flex-column flex-sm-row gap-20">
            <button
              className="btn btn-outline-primary btn-lg width-100 width-sm-auto"
              onClick={handleClose}>
              Cancel
            </button>
            <button className="btn btn-primary btn-lg width-100 width-sm-auto">Save</button>
          </div>
        }></Popup>
    </div>
  );
};
export default React.memo(StyleguidePage);

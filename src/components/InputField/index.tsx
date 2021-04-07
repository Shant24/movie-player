import React, { memo, useEffect, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components/macro';

import { COLORS, NunitoFont } from '../../assets/styles/GlobalStyles';
import { changeLink, checkLink, getQuality } from '../../helpers/linkHelper';
import { IQuality } from '../../types/player';

const qualityOptions: IQuality[] = [
  { label: 240, value: 240 },
  { label: 360, value: 360 },
  { label: 480, value: 480 },
  { label: 720, value: 720 },
  { label: 1080, value: 1080 },
];

const InputFieldContainer = styled.div``;

type FormProps = {
  isShowSelector: boolean;
};

const Form = styled.form<FormProps>`
  margin: 20px auto 0;
  max-width: 640px;
  display: grid;
  grid-template: ${({ isShowSelector }) =>
    isShowSelector
      ? "'input quality button' / 1fr 110px 100px"
      : "'input button' / 1fr 100px"};

  @media (max-width: 1280px) {
  }

  @media (max-width: 768px) {
    grid-template: ${({ isShowSelector }) =>
      isShowSelector
        ? `'input input' 50px
        'quality button'
        / 3fr 1.5fr`
        : `'input button' / 1fr 100px`};
  }
`;

const Input = styled.input`
  padding: 0 10px;
  width: 100%;
  height: 50px;
  grid-area: input;
  color: ${COLORS.primaryDark};
  font-size: 25px;
  font-weight: 600;
  font-family: ${NunitoFont};
  border-radius: 5px 0 0 5px;
  border: none;
  border-right: 1px solid ${COLORS.primary};
  outline: none;

  @media (max-width: 1280px) {
    height: 40px;
  }

  @media (max-width: 768px) {
    border-radius: 5px;
  }
`;

const SelectWrapper = styled.div`
  grid-area: quality;

  .qualitySelector {
    &__control {
      height: 50px;
      border-radius: 0;
      border: none;
      cursor: pointer;

      @media (max-width: 1280px) {
        height: 40px;
      }

      @media (max-width: 768px) {
        border-radius: 5px 0 0 5px;
      }

      &--is-focused {
        box-shadow: none;
      }

      &--menu-is-open {
        svg {
          transform: rotate(180deg);
        }
      }

      .qualitySelector__value-container {
        font-size: 20px;

        .qualitySelector__single-value {
          color: ${COLORS.primaryDark};
        }
      }

      .qualitySelector__indicator-separator {
        background-color: ${COLORS.primary};
      }

      svg {
        color: ${COLORS.primary};
        transition: all 0.1s ease-in-out;

        &:hover {
          color: ${COLORS.primarySemiDark};
        }
      }
    }

    &__menu {
      margin: 1px 0;
      border-radius: 0 0 4px 4px;

      &-list {
        padding: 4px;

        .qualitySelector__option {
          color: ${COLORS.primaryDark};
          border-radius: 4px;
          cursor: pointer;

          &:hover {
            color: white;
            background-color: ${COLORS.primarySemiDark};
          }

          &--is-selected {
            color: white;
            background-color: ${COLORS.primaryDark};

            &:hover {
              background-color: ${COLORS.primaryDark};
            }
          }
        }
      }
    }
  }
`;

type ButtonProps = {
  isDisabled: boolean;
};

const SubmitButton = styled.button<ButtonProps>`
  grid-area: button;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background-color: ${({ isDisabled }) =>
    isDisabled ? COLORS.disable : COLORS.primary};

  transition: all 0.2s ease-in-out;
  border-radius: 0 5px 5px 0;
  border: none;
  border-left: 1px solid ${COLORS.primary};
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ isDisabled }) =>
      isDisabled ? COLORS.disable : COLORS.primaryDark};
  }
`;

interface InputFieldProps {
  setVideoLink: (link: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ setVideoLink }) => {
  const [link, setLink] = useState<string>(
    'https://nickel.cloud.cdnland.in/movies/6313dba955fd4f750105d2fbbc521c4a4cbf91bc/e04d88d9455a7f31649d64472415b320:2021040801/1080.mp4',
  );
  const [quality, setQuality] = useState<IQuality | null>(
    qualityOptions[qualityOptions.length - 1],
  );
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    setIsDisabled(!checkLink(link));
  }, [link]);

  useEffect(() => {
    if (!isDisabled) {
      qualityOptions.forEach((_quality: IQuality) => {
        _quality.value === getQuality(link) && setQuality(_quality);
      });
    }
  }, [isDisabled, link]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value.trim());
  };

  const handleChangeQuality = (_quality: IQuality | null) => {
    setQuality(_quality);
    if (checkLink(link)) {
      setLink(changeLink(link, _quality));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVideoLink(link);
  };

  return (
    <InputFieldContainer>
      <Form onSubmit={handleSubmit} isShowSelector={!isDisabled}>
        <Input type="text" value={link} onChange={handleChange} />

        {!isDisabled && (
          <SelectWrapper>
            <Select
              className="qualitySelector"
              classNamePrefix="qualitySelector"
              value={quality}
              onChange={handleChangeQuality}
              options={qualityOptions}
              isSearchable={false}
            />
          </SelectWrapper>
        )}

        <SubmitButton
          type="submit"
          disabled={isDisabled}
          isDisabled={isDisabled}
        >
          Watch
        </SubmitButton>
      </Form>
    </InputFieldContainer>
  );
};

export default memo(InputField);

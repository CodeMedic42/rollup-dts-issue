import React from 'react';

type ComponentSubProps = {
    message: string;
  }

export default function ComponentSub({ message }: ComponentSubProps) {
    return (
        <span>
            {message}
        </span>
    );
}
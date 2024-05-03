import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from '../src/features/header';
import React from 'react'

describe('Header', () => {
  it('"Products" text has to be in document', () => {
    render(<Header />)
    expect(screen.getByText('Products')).toBeDefined();
  });
})
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('renders mars rover in react for sendbox text', () => {
  render(<App />);
  const title = screen.getByText(/Mars Rover In React For SendBox/i);
  expect(title).toBeInTheDocument();
});

test('renders position input', () => {
  render(<App />);
  const inputPosition = screen.getByTestId(/input-position/i);
  expect(inputPosition).toBeInTheDocument();
});

test('renders action buttons', () => {
  render(<App />);
  const moveButton = screen.getByText(/Move/i);
  expect(moveButton).toBeInTheDocument();
  const leftButton = screen.getByText(/Left/i);
  expect(leftButton).toBeInTheDocument();
  const rightButton = screen.getByText(/Right/i);
  expect(rightButton).toBeInTheDocument();
});

test('renders path input', () => {
  render(<App />);
  const inputPath = screen.getByTestId(/input-path/i);
  expect(inputPath).toBeInTheDocument();
});

test('action buttons inserts correct inputs', () => {
  render(<App />);

  const moveButton = screen.getByTestId(/button-move/i);
  fireEvent.click(moveButton);

  const inputPathOne = screen.getByTestId(/input-path/i);
  expect(inputPathOne).toHaveValue('M');

  const leftButton = screen.getByTestId(/button-left/i);
  fireEvent.click(leftButton);

  const inputPathTwo = screen.getByTestId(/input-path/i);
  expect(inputPathTwo).toHaveValue('ML');

  const rightButton = screen.getByTestId(/button-right/i);
  fireEvent.click(rightButton);

  const inputPathThree = screen.getByTestId(/input-path/i);
  expect(inputPathThree).toHaveValue('MLR');
});

test('renders clear button', () => {
  render(<App />);
  const clearButton = screen.getByTestId(/button-clear/i);
  expect(clearButton).toBeInTheDocument();
});

test('renders sample buttons', () => {
  render(<App />);
  const sampleButtonOne = screen.getByTestId(/button-sample-one/i);
  expect(sampleButtonOne).toBeInTheDocument();
  const sampleButtonTwo = screen.getByTestId(/button-sample-two/i);
  expect(sampleButtonTwo).toBeInTheDocument();
});

test('sample buttons inserts correct inputs', () => {
  render(<App />);

  const sampleButtonOne = screen.getByTestId(/button-sample-one/i);
  const sampleButtonOneValue = sampleButtonOne.value;
  fireEvent.click(sampleButtonOne);

  const inputPathOne = screen.getByTestId(/input-path/i);
  expect(inputPathOne).toHaveValue(sampleButtonOneValue);

  const sampleButtonTwo = screen.getByTestId(/button-sample-two/i);
  const sampleButtonTwoValue = sampleButtonTwo.value;
  fireEvent.click(sampleButtonTwo);

  const inputPathTwo = screen.getByTestId(/input-path/i);
  expect(inputPathTwo).toHaveValue(sampleButtonTwoValue);
});

test('renders execute button', () => {
  render(<App />);
  const executeButton = screen.getByTestId(/button-execute/i);
  expect(executeButton).toBeInTheDocument();
});

test('plots given path', () => {
  render(<App />);

  const inputPosition = screen.getByTestId(/input-position/i);
  fireEvent.change(inputPosition, {target: {value: '33E'}});
  expect(inputPosition).toHaveValue('33E');

  const sampleButton = screen.getByTestId(/button-sample-two/i);
  const sampleButtonValue = sampleButton.value;
  fireEvent.click(sampleButton);

  const inputPath = screen.getByTestId(/input-path/i);
  expect(inputPath).toHaveValue(sampleButtonValue);

  const executeButton = screen.getByTestId(/button-execute/i);
  fireEvent.click(executeButton);

  waitFor(()=>setTimeout(() => {

    const endPath = screen.getByText(/5-1/i);
    expect(endPath).toBeInTheDocument();
  
    const siblingOfEndPathElement = endPath.nextSibling
    expect(siblingOfEndPathElement).toHaveClass("rover E ");
    
  }, 5000));
});

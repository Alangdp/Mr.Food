export interface StepProps {
  onNext?: () => void;
  onChange?: (data: { [key: string]: string }) => void;
  onPreviuos?: () => void;
}

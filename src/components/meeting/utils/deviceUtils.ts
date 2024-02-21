import {
  AudioTransformDevice,
  DefaultDeviceController,
  Device,
  isAudioTransformDevice,
  isVideoTransformDevice,
  VideoTransformDevice
} from 'amazon-chime-sdk-js';

export const getDeviceId = async (
  device:
  | Device
  | AudioTransformDevice
  | VideoTransformDevice
  | null
  | undefined
): Promise<string> => {
  if (!device) {
    return '';
  }

  let intrinsicDevice: Device | null;

  if (isAudioTransformDevice(device) || isVideoTransformDevice(device)) {
    intrinsicDevice = await device.intrinsicDevice();
  } else {
    intrinsicDevice = device;
  }
  const deviceId = DefaultDeviceController.getIntrinsicDeviceId(
    intrinsicDevice
  ) as string;

  return deviceId;
};

export const isOptionActive = async (
  selectedDevice:
  | Device
  | AudioTransformDevice
  | VideoTransformDevice
  | null
  | undefined,
  currentDeviceId: string
): Promise<boolean> => {
  const selectedDeviceId = await getDeviceId(selectedDevice);
  return selectedDeviceId === currentDeviceId;
};

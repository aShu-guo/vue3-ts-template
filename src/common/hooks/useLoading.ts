export default function useLoading(defaultValue?: boolean) {
  const loading = ref<boolean>(defaultValue ?? false);
  const setLoading = (val: boolean) => {
    loading.value = val;
  };
  return {
    setLoading,
    loading: readonly(loading),
  };
}

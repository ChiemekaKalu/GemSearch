export const createLoadingState = () => {
    const loading = document.createElement('div');
    loading.className = 'loading-state';

    loading.innerHTML = `
    <div class="loading-result">
      <div class="shimmer timestamp-shimmer"></div>
      <div class="shimmer text-shimmer"></div>
    </div>
    <div class="loading-result">
      <div class="shimmer timestamp-shimmer"></div>
      <div class="shimmer text-shimmer"></div>
    </div>
    <div class="loading-result">
      <div class="shimmer timestamp-shimmer"></div>
      <div class="shimmer text-shimmer"></div>
    </div>
  `;

    return loading;
};

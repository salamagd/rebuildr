function clickRebuildButton() {
  rebuildButton = document.querySelector('.build-rebuild-button');
  if (rebuildButton) {
    clearInterval(window.rebuildrInterval);
    console.log('[Rebuildr] Triggering rebuild');
    rebuildButton.click();
  }
}

function watchForFailedBuild() {
  if (document.querySelector('.build-pipeline-state-failed.build-pipeline-job-script')) {
    console.log('[Rebuildr] Build failed!');
    clearInterval(window.rebuildrInterval);
    cancelButton = document.querySelector('.build-cancel-button');
    window.rebuildrInterval = setInterval(clickRebuildButton, 1000);
    if (cancelButton) {
      console.log('[Rebuildr] Cancelling build');
      cancelButton.click();
    } else {
      clickRebuildButton();
    }
  }
}

function watchForRunningBuild() {
  if (document.querySelector('.build-state-started')) {
    console.log('[Rebuildr] Build running...');
    clearInterval(window.rebuildrInterval);
    window.rebuildrInterval = setInterval(watchForFailedBuild, 1000);
    watchForFailedBuild();
  }
}

if (document.querySelector('#build')) {
  console.log('[Rebuildr] Extension loaded - Buildkite build detected');
  window.rebuildrInterval = setInterval(watchForRunningBuild, 1000);
  watchForRunningBuild();
}

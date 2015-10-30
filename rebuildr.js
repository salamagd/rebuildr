function watchForFailedBuild() {
  if (document.querySelector('.build-state-started .build-pipeline-state-failed.build-pipeline-job-script')) {
    clearInterval(window.rebuildrInterval);
    console.log('Build failure detected in running build!');
    document.querySelector('.build-cancel-button').click();
    setTimeout(function() {
      document.querySelector('.build-rebuild-button').click();
    }, 2000);
  }
}

if (document.querySelector('#build')) {
  console.log('Rebuildr extension loaded - build detected');
  window.rebuildrInterval = setInterval(watchForFailedBuild, 1000);
}

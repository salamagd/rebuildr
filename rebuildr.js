console.log('Rebuildr extension loaded!');

function watchForFailedBuild() {
  if (document.querySelectorAll('#build .build-pipeline-state-failed.build-pipeline-job-script').length > 0) {
    console.log('Build failure detected!');
    buttonToMash = document.querySelector('.build-cancel-button, .build-rebuild-button');
    if (buttonToMash) {
      buttonToMash.click();
    }
  }
}

setInterval(watchForFailedBuild, 1000);

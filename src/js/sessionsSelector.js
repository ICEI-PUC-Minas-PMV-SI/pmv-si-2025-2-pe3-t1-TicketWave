// const state = {
//     currentMovieId: null,
//     currentSessions: [],
//     selectedDate: null
// }

// function renderSessionsView(container, movieId) {
//     if (!container) {
//         console.error('Não foi possível renderizar as sessões: Container não encontrado');
//         return;
//     }

//     state.currentMovieId = movieId;
//     const movies = DataLoader.getMovies();
//     const sessions = DataLoader.getSessions(movieId);

//     currentMovie = movies.filter(movie => movie.movieId == state.currentMovieId);
    
//     if (!sessions || sessions.length === 0) {
//         alert('Não há sessões disponíveis para o filme selecionado.');
//         window.navigate('movies');
//         return;
//     }
//     // TODO: Implement the view of days and hours of sessions
//     // renderDateTabs(sessions);
// }

// function renderDateTabs(sessions) {
//     const dates = getUniqueDates(sessions);
    
//     const tabsContainer = document.createElement('div');
//     tabsContainer.className = 'date-tabs-container mb-4';
    
//     const tabs = document.createElement('ul');
//     tabs.className = 'nav nav-pills date-tabs';
//     tabs.setAttribute('role', 'tablist');
    
//     dates.forEach((date, index) => {
//       const li = document.createElement('li');
//       li.className = 'nav-item';
      
//       const button = document.createElement('button');
//       button.className = `nav-link date-tab ${index === 0 ? 'active' : ''}`;
//       button.setAttribute('data-date', date);
//       button.setAttribute('type', 'button');
//       button.setAttribute('role', 'tab');
      
//       const dateObj = new Date(date + 'T00:00:00');
//       const dayOfWeek = dateObj.toLocaleDateString('pt-BR', { weekday: 'short' });
//       const dayOfMonth = dateObj.getDate();
//       const month = dateObj.toLocaleDateString('pt-BR', { month: 'short' });
      
//       button.innerHTML = `
//         <div class="date-tab-content">
//           <div class="date-day">${dayOfWeek}</div>
//           <div class="date-number">${dayOfMonth}</div>
//           <div class="date-month">${month}</div>
//         </div>
//       `;
      
//       li.appendChild(button);
//       tabs.appendChild(li);
//     });
    
//     tabsContainer.appendChild(tabs);
//     return tabsContainer;
// }

// function getUniqueDates(sessions) {
//     const dates = [...new Set(sessions.map(session => session.date))];
//     return dates.sort();
// }



const crawlspaceRecs = [
  'Install 2 to 3 vents to the outside of the house.',
  'Airseal all penetrations going to the house from the crawlspace.',
  'Seal the rim-band-joist with foam.',
  'Add R-19 to the existing insulation.',
  'Install R-30 insulation to the ceiling of the attic.',
  'Install a radiant barrier to retain the insulation against the floor, eliminate wind washing and stop moisture getting in the insulation.',
  'Weatherstrip the crawlspace hatch.',
  'Insulate the crawlspace hatch.',
  'Weatherstrip and insulation the crawlspace hatch.',
  'If you have water pipes in the crawlspace, they will need to be heated with electrical heat tape.'
]

const attic_issues = [
  'There is no access to the XXX attic.',
'The top-plates and end walls leak air into the walls.',
'There is flooring in the attic and air can pass underneath is, so the insulation is not working to capacity.',
'There is a chase feeding air from the attic to the basement.',
'J-boxes, which are the electrical boxes that support fans and light fixtures leak.',
'The bathroom fan vents into the attic.',
'Recessed lights are not insulation compatible or airtight.',
'The eave vents are blocked with old insulation, and there are no baffles directing the eave vent', 'r over the insulation.',
'There a no baffles directing soffit vent air over the insulation.',
'The attic hatch is not insulated or airtight.',
'The attic stair is not insulated and leaks air to the attic.',
'There is insufficient insulation and it is very gappy and not working to capacity.',
]

const reportSchemaArray = [
  ['name', 'recs'],
  ['crawlspace', crawlspaceRecs],
  ['attic', attic_issues],
];

//sanitize strings, remove dots
reportSchemaArray.map( row => {
  for (var i = 0; i < row[1].length; i++) {
    row[1][i] = replaceAll(row[1][i], '\\.', '');
    //console.log('row[1][i]: ' + row[1][i]);
  }
});

ReportSections = convertToObjectOfObjects(reportSchemaArray);
from django.db import models

# Create your models here.
class Coviddata(models.Model):
    date = models.DateField(db_column='Date', primary_key=True)  # Field name made lowercase.
    regionid = models.ForeignKey('RegionsHierarchy', models.DO_NOTHING, db_column='RegionID')  # Field name made lowercase.
    totalcases = models.IntegerField(db_column='TotalCases', blank=True, null=True)  # Field name made lowercase.
    activecases = models.IntegerField(db_column='ActiveCases', blank=True, null=True)  # Field name made lowercase.
    recoveredcases = models.IntegerField(db_column='RecoveredCases', blank=True, null=True)  # Field name made lowercase.
    deaths = models.IntegerField(db_column='Deaths', blank=True, null=True)  # Field name made lowercase.
    newtotalcases = models.IntegerField(db_column='NewTotalCases', blank=True, null=True)  # Field name made lowercase.
    newactivecases = models.IntegerField(db_column='NewActiveCases', blank=True, null=True)  # Field name made lowercase.
    newrecoveredcases = models.IntegerField(db_column='NewRecoveredCases', blank=True, null=True)  # Field name made lowercase.
    newdeaths = models.IntegerField(db_column='NewDeaths', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'CovidData'
        unique_together = (('date', 'regionid'),)


class Events(models.Model):
    eventid = models.AutoField(db_column='EventID', primary_key=True)  # Field name made lowercase.
    eventname = models.CharField(db_column='EventName', max_length=100, blank=True, null=True)  # Field name made lowercase.
    startdate = models.DateField(db_column='StartDate', blank=True, null=True)  # Field name made lowercase.
    enddate = models.DateField(db_column='EndDate', blank=True, null=True)  # Field name made lowercase.
    regionid = models.ForeignKey('RegionsHierarchy', models.DO_NOTHING, db_column='RegionID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Events'


class RegionsHierarchy(models.Model):
    regionid = models.AutoField(db_column='RegionID', primary_key=True)  # Field name made lowercase.
    regionname = models.CharField(db_column='RegionName', unique=True, max_length=50, blank=True, null=True)  # Field name made lowercase.
    regionlevel = models.CharField(db_column='RegionLevel', max_length=50, blank=True, null=True)  # Field name made lowercase.
    superregionid = models.IntegerField(db_column='SuperRegionID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Regions_Hierarchy'



class Industrydata(models.Model):
    date = models.DateField(db_column='Date', primary_key=True)  # Field name made lowercase.
    regionid = models.ForeignKey('RegionsHierarchy', models.DO_NOTHING, db_column='RegionID')  # Field name made lowercase.
    airlines = models.FloatField(db_column='Airlines', blank=True, null=True)  # Field name made lowercase.
    travel = models.FloatField(db_column='Travel', blank=True, null=True)  # Field name made lowercase.
    retail = models.FloatField(db_column='Retail', blank=True, null=True)  # Field name made lowercase.
    entertainment = models.FloatField(db_column='Entertainment', blank=True, null=True)  # Field name made lowercase.
    food = models.FloatField(db_column='Food', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'IndustryData'
        unique_together = (('date', 'regionid'),)


class Attributesdata(models.Model):
    attributeid = models.ForeignKey('Attributeselements', models.DO_NOTHING, db_column='AttributeID', primary_key=True)  # Field name made lowercase.
    regionid = models.ForeignKey('RegionsHierarchy', models.DO_NOTHING, db_column='RegionID')  # Field name made lowercase.
    value = models.FloatField(db_column='Value', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'AttributesData'
        unique_together = (('attributeid', 'regionid'),)



class Attributeselements(models.Model):
    attributeid = models.AutoField(db_column='AttributeID', primary_key=True)  # Field name made lowercase.
    attributename = models.CharField(db_column='AttributeName', max_length=100, blank=True, null=True)  # Field name made lowercase.
    attributetype = models.CharField(db_column='AttributeType', max_length=100, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'AttributesElements'



class CvWorldFinal(models.Model):
    date = models.DateField(db_column='Date', primary_key = True)  # Field name made lowercase.
    totalcases = models.IntegerField(db_column='TotalCases')  # Field name made lowercase.
    recoveredcases = models.IntegerField(db_column='RecoveredCases')  # Field name made lowercase.
    deaths = models.IntegerField(db_column='Deaths')  # Field name made lowercase.
    activecases = models.IntegerField(db_column='ActiveCases')  # Field name made lowercase.
    newtotalcases = models.IntegerField(db_column='NewTotalCases')  # Field name made lowercase.
    newrecoveredcases = models.IntegerField(db_column='NewRecoveredCases')  # Field name made lowercase.
    newdeaths = models.IntegerField(db_column='NewDeaths')  # Field name made lowercase.
    newactivecases = models.IntegerField(db_column='NewActiveCases')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'cv_world_final'

class Coviddatacombined(models.Model):
    confirmed = models.IntegerField(blank=True, null=True)
    active = models.IntegerField(blank=True, null=True)
    recovered = models.IntegerField(blank=True, null=True)
    deceased = models.IntegerField(blank=True, null=True)
    deltaconfirmed = models.IntegerField(blank=True, null=True)
    deltarecovered = models.IntegerField(blank=True, null=True)
    deltadeceased = models.IntegerField(blank=True, null=True)
    regionid = models.IntegerField(db_column='Regionid', primary_key = True)  # Field name made lowercase.
    regionname = models.CharField(db_column='RegionName', max_length=50, blank=True, null=True)  # Field name made lowercase.
    superregionid = models.IntegerField(db_column='SuperRegionID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False  # Created from a view. Don't remove.
        db_table = 'Coviddatacombined'

class Usconsumerspending(models.Model):
    date = models.DateField(db_column='Date', primary_key=True)  # Field name made lowercase.
    retail = models.FloatField(db_column='Retail')  # Field name made lowercase.
    food = models.FloatField(db_column='Food')  # Field name made lowercase.
    tourism = models.FloatField(db_column='Tourism')  # Field name made lowercase.
    entertainment = models.FloatField(db_column='Entertainment')  # Field name made lowercase.
    airlines = models.FloatField(db_column='Airlines')  # Field name made lowercase.
    combined = models.FloatField(db_column='Combined')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'USConsumerSpending'




#class Metrics(models.Model):
#    metricid = models.AutoField(db_column='MetricID', primary_key=True)  # Field name made lowercase.
#    metricname = models.CharField(db_column='MetricName', max_length=100, blank=True, null=True)  # Field name made lowercase.
#    metrictype = models.CharField(db_column='MetricType', max_length=50, blank=True, null=True)  # Field name made lowercase.
#    metriccolumn = models.CharField(db_column='MetricColumn', max_length=50, blank=True, null=True)  # Field name made lowercase.
#    mindate = models.DateField(db_column='MinDate', blank=True, null=True)  # Field name made lowercase.
#    maxdate = models.DateField(db_column='MaxDate', blank=True, null=True)  # Field name made lowercase.
#    sourcetable = models.CharField(db_column='SourceTable', max_length=50, blank=True, null=True)  # Field name made lowercase.

#    class Meta:
#        managed = False
#        db_table = 'Metrics'
